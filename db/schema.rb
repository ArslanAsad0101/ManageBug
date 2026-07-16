# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_07_16_140811) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id"
    t.timestamptz "created_at"
    t.text "name"
    t.bigint "record_id"
    t.text "record_type"
    t.index ["blob_id"], name: "idx_16633_index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "idx_16633_index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size"
    t.text "checksum"
    t.text "content_type"
    t.timestamptz "created_at"
    t.text "filename"
    t.text "key"
    t.text "metadata"
    t.text "service_name"
    t.index ["key"], name: "idx_16626_index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id"
    t.text "variation_digest"
    t.index ["blob_id", "variation_digest"], name: "idx_16640_index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "bugs", force: :cascade do |t|
    t.integer "bug_type", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "deadline", null: false
    t.text "description"
    t.bigint "developer_id", null: false
    t.bigint "project_id", null: false
    t.bigint "reporter_id", null: false
    t.integer "status", default: 0, null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["developer_id"], name: "index_bugs_on_developer_id"
    t.index ["project_id"], name: "index_bugs_on_project_id"
    t.index ["reporter_id"], name: "index_bugs_on_reporter_id"
  end

  create_table "project_users", force: :cascade do |t|
    t.timestamptz "created_at"
    t.bigint "project_id"
    t.timestamptz "updated_at"
    t.bigint "user_id"
    t.index ["project_id"], name: "idx_16621_index_project_users_on_project_id"
    t.index ["user_id"], name: "idx_16621_index_project_users_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.timestamptz "created_at"
    t.text "description"
    t.bigint "manager_id"
    t.text "name"
    t.timestamptz "updated_at"
    t.index ["manager_id"], name: "idx_16614_index_projects_on_manager_id"
  end

  create_table "users", force: :cascade do |t|
    t.timestamptz "created_at"
    t.text "email", default: ""
    t.text "encrypted_password", default: ""
    t.text "name"
    t.text "phone_number"
    t.timestamptz "remember_created_at"
    t.bigint "role"
    t.timestamptz "updated_at"
    t.index ["email"], name: "idx_16605_index_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id", name: "active_storage_attachments_blob_id_fkey"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id", name: "active_storage_variant_records_blob_id_fkey"
  add_foreign_key "bugs", "projects"
  add_foreign_key "bugs", "users", column: "developer_id"
  add_foreign_key "bugs", "users", column: "reporter_id"
  add_foreign_key "project_users", "projects", name: "project_users_project_id_fkey"
  add_foreign_key "project_users", "users", name: "project_users_user_id_fkey"
  add_foreign_key "projects", "users", column: "manager_id", name: "projects_manager_id_fkey"
end
