/*This construction makes it easy to manage and maintain paths 
in the dashboard application by centralizing them in one 
object and using a function to construct them dynamically.*/

const path=(root,link)=>{
    return `${root}${link}`;
}

const ROOT_DASHBOARD='/';
const AUTH_DASHBOARD="/auth"

export const PATHDASHBOARD={
    root: ROOT_DASHBOARD,
    general: {
        app: path(ROOT_DASHBOARD,"app"),
        login: path(AUTH_DASHBOARD, "/login"),
    }
}
