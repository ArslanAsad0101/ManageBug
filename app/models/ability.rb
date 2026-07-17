class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user

    if user.manager?
      can :read, Project
      can :manage, Project, manager_id: user.id
      can :read, Bug, project: { manager_id: user.id }
      
    elsif user.qa?
      can :create, Bug
      can [:read, :update, :destroy], Bug, reporter_id: user.id
      can :read, Project
      
    elsif user.developer?
      can :read, Project
      can :read, Bug, developer_id: user.id
      can :update, Bug, developer_id: user.id
    end
  end
end