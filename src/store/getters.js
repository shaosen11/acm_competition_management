const getters = {
    token: state => state.user.token,
    userId: state => state.user.userId,
    icon: state => state.user.icon,
    name: state => state.user.name,
    isLogin: state => state.user.isLogin,
    myTeamFlag: state => state.team.myTeamFlag,
    teamName: state => state.team.teamName,
    myOrganizationFlag: state => state.organization.myOrganizationFlag,
    organizationName: state => state.organization.organizationName,
    year: state => state.organization.year,
}
export default getters