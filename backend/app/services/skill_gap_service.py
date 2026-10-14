from collections import Counter
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.repositories.resume_analysis_repository import (
    ResumeAnalysisRepository,
)
from app.services.skill_match_service import (
    SkillMatchService,
)


class SkillGapService:
    @staticmethod
    def get_skill_gaps(
        db: Session,
        resume_id: UUID,
    ) -> dict:
        resume_analysis = (
            ResumeAnalysisRepository(
                db
            ).get_by_resume(resume_id)
        )

        if resume_analysis is None:
            return {
                "resume_id": resume_id,
                "total_opportunities": 0,
                "skill_gaps": [],
            }

        resume_skills = (
            resume_analysis.skills or []
        )

        opportunities = (
            db.query(Opportunity)
            .filter(
                Opportunity.required_skills.isnot(
                    None
                )
            )
            .all()
        )

        skill_counter = Counter()
        skill_display_names: dict[str, str] = {}

        analyzed_opportunities = 0

        for opportunity in opportunities:
            required_skills = (
                opportunity.required_skills
                or []
            )

            if not required_skills:
                continue

            result = SkillMatchService.match(
                resume_skills=resume_skills,
                required_skills=required_skills,
                preferred_skills=[],
            )

            missing_skills = (
                result[
                    "missing_required_skills"
                ]
            )

            for skill in missing_skills:
                normalized = (
                    SkillMatchService
                    .normalize_skill(skill)
                )

                skill_counter[normalized] += 1

                if normalized not in skill_display_names:
                    skill_display_names[
                        normalized
                    ] = skill

            analyzed_opportunities += 1

        skill_gaps = []

        for skill, count in skill_counter.most_common():
            skill_gaps.append(
                {
                    "skill": skill_display_names[
                        skill
                    ],
                    "opportunity_count": count,
                    "percentage": round(
                        (
                            count
                            / analyzed_opportunities
                        )
                        * 100,
                        2,
                    )
                    if analyzed_opportunities
                    else 0,
                }
            )

        return {
            "resume_id": resume_id,
            "total_opportunities": (
                analyzed_opportunities
            ),
            "skill_gaps": skill_gaps,
        }