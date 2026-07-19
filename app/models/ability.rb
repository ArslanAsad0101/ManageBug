class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user

    if user.manager?
      can :read, Project, manager_id: user.id
      can :manage, Project, manager_id: user.id
      can :read, Bug, project: { manager_id: user.id }
    elsif user.qa?
      can :read, Project, project_users: { user_id: user.id }
      can :create, Bug
      can [:read, :update, :destroy], Bug, reporter_id: user.id
    elsif user.developer?
      can :read, Project, project_users: { user_id: user.id }
      can :read, Bug, developer_id: user.id
      can :update, Bug, developer_id: user.id
    end
  end
end