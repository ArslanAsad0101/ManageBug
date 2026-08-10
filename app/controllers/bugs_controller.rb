class BugsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_data, only: %i[new create edit update]
  before_action :set_project, except: %i[index new create]
  before_action :set_bug, only: %i[show edit update destroy]

  def index
    @bugs = Bug.accessible_by(current_ability)
    @bugs = @bugs.where("title LIKE ?", "%#{params[:search]}%") if params[:search].present?

    respond_to do |format|
      format.html
      format.json { render json: @bugs.map { |bug| bug_json(bug) } }
    end
  end

  def new
    authorize! :create, Bug
    @bug = Bug.new

    respond_to do |format|
      format.html
      format.json do
        render json: {
          projects: @projects.map { |project| { id: project.id, name: project.name } },
          developers: users_json(@developers || [])
        }
      end
    end
  end

  def create
    authorize! :create, Bug
    @project = current_user.assigned_projects.find_by(id: bug_params[:project_id])

    # unless @project
    #   @bug = Bug.new(bug_params)
    #   @bug.errors.add(:project_id, "must be selected")
    #   return render_validation_error(:new)
    # end

    @bug = @project.bugs.build(bug_params)
    @bug.reporter = current_user

    if @bug.save
      respond_to do |format|
        format.html { redirect_to [@project, @bug], notice: "Bug was successfully created." }
        format.json { render json: bug_json(@bug), status: :created }
      end
    else
      render_validation_error(:new)
    end
  end

  def show
    authorize! :read, @bug
    @bug_json = bug_json(@bug, with_permissions: true)

    respond_to do |format|
      format.html
      format.json { render json: @bug_json }
    end
  end

  def edit
    authorize! :update, @bug
    @is_developer = current_user.developer?

    respond_to do |format|
      format.html
      format.json do
        render json: {
          bug: bug_json(@bug),
          developers: users_json(@developers || []),
          is_developer: @is_developer
        }
      end
    end
  end

  def update
    authorize! :update, @bug
    @is_developer = current_user.developer?

    if @bug.update(bug_params)
      respond_to do |format|
        format.html { redirect_to [@project, @bug], notice: "Bug updated successfully." }
        format.json { render json: bug_json(@bug) }
      end
    else
      render_validation_error(:edit)
    end
  end

  def destroy
    authorize! :destroy, @bug
    @bug.destroy

    respond_to do |format|
      format.html { redirect_to project_path(@project), notice: "Bug deleted successfully." }
      format.json { head :no_content }
    end
  end

  private

  def load_data
    @projects = current_user.assigned_projects
    selected_project_id = params.dig(:bug, :project_id) || params[:project_id]
    @developers = Project.find_by(id: selected_project_id)&.assigned_users&.developer if selected_project_id.present?
  end

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_bug
    @bug = @project.bugs.find(params[:id])
  end

  def bug_params
    return params.require(:bug).permit(:status) if current_user.developer?

    params.require(:bug).permit(
      :project_id,
      :title,
      :description,
      :deadline,
      :bug_type,
      :status,
      :developer_id,
      :screenshot
    )
  end

  def user_json(user)
    { id: user.id, name: user.name, email: user.email, role: user.role }
  end

  def users_json(users)
    users.map { |user| user_json(user) }
  end

  def bug_json(bug, with_permissions: false)
    json = {
      id: bug.id,
      project_id: bug.project_id,
      project_name: bug.project.name,
      title: bug.title,
      description: bug.description,
      deadline: bug.deadline,
      bug_type: bug.bug_type,
      status: bug.status,
      status_label: bug.status_label,
      developer: bug.developer ? user_json(bug.developer) : nil,
      reporter: user_json(bug.reporter),
      screenshot_url: bug.screenshot.attached? ? url_for(bug.screenshot) : nil
    }

    json[:permissions] = { edit: can?(:update, bug), destroy: can?(:destroy, bug) } if with_permissions
    json
  end

  def render_validation_error(template)
    respond_to do |format|
      format.html { render template, status: :unprocessable_entity }
      format.json { render json: { errors: @bug.errors.full_messages }, status: :unprocessable_entity }
    end
  end
end
