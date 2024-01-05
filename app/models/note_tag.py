from .db import db, environment, SCHEMA, add_prefix_for_prod

note_tags = db.Table(
    "note_tags",
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column(
        "note_id", db.Integer, db.ForeignKey(add_prefix_for_prod("notes.id"))),
    db.Column(
        "tag_id", db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id"))
    )
)

if environment == "production":
    note_tags.schema = SCHEMA
