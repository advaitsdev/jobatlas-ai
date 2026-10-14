"""add opportunity id to job applications

Revision ID: 81c7c65d9142
Revises: 4900f8e237e9
Create Date: 2026-10-06 13:36:02.965345

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "81c7c65d9142"
down_revision: Union[str, Sequence[str], None] = "4900f8e237e9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "job_applications",
        sa.Column(
            "opportunity_id",
            sa.UUID(),
            nullable=True,
        ),
    )

    op.create_foreign_key(
        "fk_job_applications_opportunity_id",
        "job_applications",
        "opportunities",
        ["opportunity_id"],
        ["id"],
        ondelete="SET NULL",
    )

    op.create_unique_constraint(
        "uq_job_applications_opportunity_id",
        "job_applications",
        ["opportunity_id"],
    )


def downgrade() -> None:
    op.drop_constraint(
        "uq_job_applications_opportunity_id",
        "job_applications",
        type_="unique",
    )

    op.drop_constraint(
        "fk_job_applications_opportunity_id",
        "job_applications",
        type_="foreignkey",
    )

    op.drop_column(
        "job_applications",
        "opportunity_id",
    )