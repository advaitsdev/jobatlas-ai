"""add source to opportunities

Revision ID: 4900f8e237e9
Revises: d3ad46df3fdd
Create Date: 2026-09-29 12:52:13.139372

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "4900f8e237e9"
down_revision: Union[str, Sequence[str], None] = "d3ad46df3fdd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "opportunities",
        sa.Column(
            "source",
            sa.String(length=100),
            nullable=True,
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column(
        "opportunities",
        "source",
    )