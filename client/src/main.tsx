import {createRoot} from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import PublicRoutes from "./utils/PublicRoutes.tsx";
import PublicLayout from "./layouts/PublicLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import BlogsPage from "./pages/BlogsPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import BlogDetailsPage from "./pages/BlogDetails/BlogDetailsPage.tsx";
import NewBlogPage from "./pages/NewBlogPage/NewBlogPage.tsx";
import EditBlogPage from "./pages/EditBlogPage.tsx";
import EditUserPage from "./pages/Profile/EditUserPage/EditUserPage.tsx";
import LoginPage from "./pages/Auth/LoginPage.tsx";
import RegisterPage from "./pages/Auth/RegisterPage.tsx";
import AdminRoutes from "./utils/AdminRoutes.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import AdminDashboardPage from "./pages/Admin/Dashboard/AdminDashboardPage.tsx";
import AdminCategoriesPage from "./pages/Admin/AdminCategories/AdminCategoryList/AdminCategoriesPage.tsx";
import AdminAddCategoryPage from "./pages/Admin/AdminCategories/AddCategory/AdminAddCategoryPage.tsx";
import BlogListPage from "./pages/Admin/Blogs/BlogListPage/BlogListPage.tsx";
import AddBlogPage from "./pages/Admin/Blogs/AddBlog/AddBlogPage.tsx";
import UsersPage from "./pages/Admin/Users/UsersList/UsersPage.tsx";
import UpdateCategoryPage from "./pages/Admin/AdminCategories/UpdateCategory/UpdateCategoryPage.tsx";
import UpdateBlogPage from "./pages/Admin/Blogs/UpdateBlog/UpdateBlogPage.tsx";
import UpdateUserPage from "./pages/Admin/Users/UpdateUser/UpdateUserPage.tsx";
import AuthContext from "./context/AuthContext.tsx";
import { ToastContainer } from 'react-toastify';
import {Provider} from "react-redux";
import store from "./redux/store.ts";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <PublicLayout/>,
                children: [
                    {
                        path: "",
                        element: <HomePage/>
                    },
                    {
                        path: "blogs",
                        element: <BlogsPage/>
                    },
                    {
                        path: "blog/:slug",
                        element: <BlogDetailsPage/>
                    },
                    {
                        path: '',
                        element: <PublicRoutes />,
                        children: [
                            {
                                path: "profile/:slug",
                                element: <ProfilePage/>
                            },
                            {
                                path: "profile/edit/:slug",
                                element: <EditUserPage/>
                            },
                            {
                                path: "new-blog",
                                element: <NewBlogPage/>
                            },
                            {
                                path: "edit-blog/:slug",
                                element: <EditBlogPage/>
                            },
                        ]
                    }
                ]
            },
            {
                path: "admin",
                element: <AdminRoutes/>,
                children: [
                    {
                        path: "",
                        element: <AdminLayout/>,
                        children: [
                            {
                                path: "",
                                element: <Navigate to="dashboard" replace/>
                            },
                            {
                                path: "dashboard",
                                element: <AdminDashboardPage/>
                            },
                            {
                                path: "categories",
                                element: <AdminCategoriesPage/>
                            },
                            {
                                path: "categories/new-category",
                                element: <AdminAddCategoryPage/>
                            },
                            {
                                path: "categories/update/:slug",
                                element: <UpdateCategoryPage/>
                            },
                            {
                                path: "blogs",
                                element: <BlogListPage/>
                            },
                            {
                                path: "blogs/new-blog",
                                element: <AddBlogPage/>
                            },
                            {
                                path: "blogs/update/:slug",
                                element: <UpdateBlogPage/>
                            },
                            {
                                path: "users",
                                element: <UsersPage/>
                            },
                            {
                                path: "users/update/:slug",
                                element: <UpdateUserPage/>
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/auth/login",
        element: <LoginPage/>
    },
    {
        path: "/auth/register",
        element: <RegisterPage/>
    }
])

createRoot(document.getElementById('root')!).render(
    <>
        <AuthContext>
            <Provider store={store}>
                <RouterProvider router={routes}/>
                <ToastContainer position="top-right" autoClose={2000} pauseOnHover={false} />
            </Provider>
        </AuthContext>
    </>,
)
