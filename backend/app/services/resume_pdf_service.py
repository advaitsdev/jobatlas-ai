from io import BytesIO

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

from app.schemas.optimized_resume import OptimizedResume


class ResumePDFService:

    @staticmethod
    def generate_pdf(
        resume: OptimizedResume,
    ) -> BytesIO:

        buffer = BytesIO()

        document = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=16 * mm,
            leftMargin=16 * mm,
            topMargin=14 * mm,
            bottomMargin=14 * mm,
            title=f"{resume.name} - Optimized Resume",
            author="JobAtlasAI",
        )

        styles = getSampleStyleSheet()

        name_style = ParagraphStyle(
            "ResumeName",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            alignment=TA_CENTER,
            spaceAfter=5,
            textColor=colors.black,
        )

        contact_style = ParagraphStyle(
            "ResumeContact",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            alignment=TA_CENTER,
            spaceAfter=8,
            textColor=colors.HexColor("#444444"),
        )

        section_style = ParagraphStyle(
            "ResumeSection",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            spaceBefore=8,
            spaceAfter=4,
            textColor=colors.black,
        )

        body_style = ParagraphStyle(
            "ResumeBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=12,
            spaceAfter=3,
            textColor=colors.black,
        )

        bullet_style = ParagraphStyle(
            "ResumeBullet",
            parent=body_style,
            leftIndent=10,
            firstLineIndent=-6,
            spaceAfter=2.5,
        )

        entry_title_style = ParagraphStyle(
            "ResumeEntryTitle",
            parent=body_style,
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            spaceAfter=1,
        )

        entry_meta_style = ParagraphStyle(
            "ResumeEntryMeta",
            parent=body_style,
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=colors.HexColor("#555555"),
            spaceAfter=2,
        )

        skills_style = ParagraphStyle(
            "ResumeSkills",
            parent=body_style,
            fontSize=8.5,
            leading=12,
        )

        story = []

        # ---------------------------------------------------------
        # HEADER
        # ---------------------------------------------------------

        story.append(
            Paragraph(
                resume.name,
                name_style,
            )
        )

        contact_parts = []

        if resume.email:
            contact_parts.append(resume.email)

        if resume.phone:
            contact_parts.append(resume.phone)

        if contact_parts:
            story.append(
                Paragraph(
                    " | ".join(contact_parts),
                    contact_style,
                )
            )

        story.append(
            HRFlowable(
                width="100%",
                thickness=0.8,
                color=colors.black,
                spaceBefore=1,
                spaceAfter=6,
            )
        )

        # ---------------------------------------------------------
        # SUMMARY
        # ---------------------------------------------------------

        if resume.summary:
            story.append(
                Paragraph(
                    "PROFESSIONAL SUMMARY",
                    section_style,
                )
            )

            story.append(
                Paragraph(
                    resume.summary,
                    body_style,
                )
            )

        # ---------------------------------------------------------
        # EDUCATION
        # ---------------------------------------------------------

        if resume.education:
            story.append(
                Paragraph(
                    "EDUCATION",
                    section_style,
                )
            )

            for education in resume.education:

                story.append(
                    Paragraph(
                        education.degree,
                        entry_title_style,
                    )
                )

                meta_parts = []

                if education.institution:
                    meta_parts.append(
                        education.institution
                    )

                if education.duration:
                    meta_parts.append(
                        education.duration
                    )

                if education.location:
                    meta_parts.append(
                        education.location
                    )

                if meta_parts:
                    story.append(
                        Paragraph(
                            " | ".join(meta_parts),
                            entry_meta_style,
                        )
                    )

        # ---------------------------------------------------------
        # EXPERIENCE
        # ---------------------------------------------------------

        if resume.experience:
            story.append(
                Paragraph(
                    "EXPERIENCE",
                    section_style,
                )
            )

            for experience in resume.experience:

                story.append(
                    Paragraph(
                        experience.title,
                        entry_title_style,
                    )
                )

                meta_parts = []

                if experience.organization:
                    meta_parts.append(
                        experience.organization
                    )

                if experience.duration:
                    meta_parts.append(
                        experience.duration
                    )

                if experience.location:
                    meta_parts.append(
                        experience.location
                    )

                if meta_parts:
                    story.append(
                        Paragraph(
                            " | ".join(meta_parts),
                            entry_meta_style,
                        )
                    )

                for highlight in experience.highlights:

                    if highlight.strip():
                        story.append(
                            Paragraph(
                                f"• {highlight}",
                                bullet_style,
                            )
                        )

        # ---------------------------------------------------------
        # PROJECTS
        # ---------------------------------------------------------

        if resume.projects:
            story.append(
                Paragraph(
                    "PROJECTS",
                    section_style,
                )
            )

            for project in resume.projects:

                story.append(
                    Paragraph(
                        project.name,
                        entry_title_style,
                    )
                )

                meta_parts = []

                if project.year:
                    meta_parts.append(
                        project.year
                    )

                if project.tech_stack:
                    meta_parts.append(
                        " • ".join(
                            project.tech_stack
                        )
                    )

                if meta_parts:
                    story.append(
                        Paragraph(
                            " | ".join(meta_parts),
                            entry_meta_style,
                        )
                    )

                for highlight in project.highlights:

                    if highlight.strip():
                        story.append(
                            Paragraph(
                                f"• {highlight}",
                                bullet_style,
                            )
                        )

        # ---------------------------------------------------------
        # SKILLS
        # ---------------------------------------------------------

        if resume.skills:
            story.append(
                Paragraph(
                    "SKILLS",
                    section_style,
                )
            )

            skills_text = " • ".join(
                skill
                for skill in resume.skills
                if skill.strip()
            )

            if skills_text:
                story.append(
                    Paragraph(
                        skills_text,
                        skills_style,
                    )
                )

        document.build(story)

        buffer.seek(0)

        return buffer