class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_users, only: %i[new create edit update]
  before_action :set_project, only: %i[show edit update destroy]

  def index
    @projects = Project.accessible_by(current_ability)
    @projects = @projects.where("name LIKE ?", "%#{params[:search]}%") if params[:search].present?

    respond_to do |format|
      format.html
      format.json { render json: @projects.map { |project| project_json(project) } }
    end
  end

  def new
    authorize! :create, Project
    @project = Project.new

    respond_to do |format|
      format.html
      format.json { render json: { qas: users_json(@qas), developers: users_json(@developers) } }
    end
  end

  def create
    authorize! :create, Project
    @project = current_user.projects.build(project_params)
    assign_user_ids_to_project

    if @project.save
      save_project_users

      respond_to do |format|
        format.html { redirect_to projects_path, notice: "Project created successfully." }
        format.json { render json: project_json(@project), status: :created }
      end
    else
      render_validation_error(:new)
    end
  end

  def show
    @project_json = project_json(@project)

    respond_to do |format|
      format.html
      format.json { render json: @project_json }
    end
  end

  def edit
    authorize! :update, @project

    respond_to do |format|
      format.html
      format.json do
        render json: {
          project: project_json(@project),
          qas: users_json(@qas),
          developers: users_json(@developers),
          selected_user_ids: @project.project_users.pluck(:user_id)
        }
      end
    end
  end

  def update
    authorize! :update, @project
    assign_user_ids_to_project

    if @project.update(project_params)
      save_project_users

      respond_to do |format|
        format.html { redirect_to @project, notice: "Project updated successfully." }
        format.json { render json: project_json(@project) }
      end
    else
      render_validation_error(:edit)
    end
  end

  def destroy
    authorize! :destroy, @project
    @project.destroy
    redirect_to projects_path, notice: "Project deleted successfully."
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :description, :image)
  end

  def load_users
    @qas = User.qa
    @developers = User.developer
  end

  def selected_project_user_ids
    Array(params.dig(:project, :qa_user_ids)).map(&:to_i) +
      Array(params.dig(:project, :developer_user_ids)).map(&:to_i)
  end

  def assign_user_ids_to_project
    @project.qa_user_ids = Array(params.dig(:project, :qa_user_ids)).map(&:to_i)
    @project.developer_user_ids = Array(params.dig(:project, :developer_user_ids)).map(&:to_i)
  end

  def save_project_users
    @project.project_users.destroy_all
    selected_project_user_ids.each do |user_id|
      @project.project_users.create(user_id: user_id)
    end
  end

  def user_json(user)
    { id: user.id, name: user.name, email: user.email, role: user.role }
  end

  def users_json(users)
    users.map { |user| user_json(user) }
  end

  def project_json(project)
    {
      id: project.id,
      name: project.name,
      description: project.description,
      image_url: project.image.attached? ? url_for(project.image) : nil,
      qa_users: project.assigned_users.where(role: "qa").map { |user| user_json(user) },
      developer_users: project.assigned_users.where(role: "developer").map { |user| user_json(user) },
      selected_user_ids: project.project_users.pluck(:user_id)
    }
  end

  def render_validation_error(template)
    respond_to do |format|
      format.html { render template, status: :unprocessable_entity }
      format.json { render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity }
    end
  end
end
