import CustomTable from "../../../../components/UI/CustomTable/CustomTable.tsx";
import {CustomTableData} from "../../../../types.ts";
import {Link} from "react-router";
import {
    useDeleteCategoryMutation,
    useFetchCategoriesQuery
} from "../../../../services/AdminServices/categoryService.ts";
import Loader from "../../../../components/UI/Loader.tsx";
import {useEffect, useRef, useState} from "react";
import {formattedDate} from "../../../../utils/generateDate.ts";
import AlertModal from "../../../../components/UI/Modals/AlertModal.tsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {toast} from "react-toastify";

interface AdminCatType {
    id: string
    title: string
    // blogCount: number
    slug: string
    createdAt: string
    updatedAt: string
}


const AdminCategoriesPage = () => {

    const {data, isLoading, isFetching, refetch} = useFetchCategoriesQuery(undefined)
    const [isModalInvalid, setIsModalInvalid] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedCatId, setSelectedCatId] = useState<string | null>(null)
    const modalRef = useRef(null)

    const [deleteCategory, {isError, error}] = useDeleteCategoryMutation()

    const handleDeleteCategory = async () => {
        const result = await deleteCategory(selectedCatId!).unwrap()

        if(result) {
            setIsModalInvalid(false)
            setIsModalOpen(false)
            toast.warning(result.message)
            refetch()
        }
    }

    useGSAP(() => {
        if (isModalOpen) {
            gsap.fromTo(modalRef?.current, {opacity: 0}, {
                opacity: 1,
                duration: .7,
                ease: 'power2.out'
            })
        }

        if(isModalInvalid && !isModalOpen) {
            gsap.to(modalRef?.current, {
                opacity: 0,
                duration: .2,
                onComplete: () => {
                    setIsModalInvalid(false)
                }
            })
        }
    }, [isModalOpen, isModalInvalid])

    const tableColumns: CustomTableData<AdminCatType>[] = [
        {
            key: "categoryTitle",
            className: "categoryTitle",
            label: "Category Title",
            width: "40%",
            render: (item) => {
                return <span style={{fontWeight: "500"}}>{item.title}</span>
            }
        },
        {
            key: "blogCount",
            className: "blogCount",
            label: "Blog Count",
            width: "15%",
            render: () => {
                return 10
            }
        },
        {
            key: "createdAt",
            className: "createdAt",
            label: "Created At",
            width: "25%",
            render: (item) => {
                return <strong>{formattedDate(item?.createdAt)}</strong>
            }
        },
        {
            key: "actions",
            className: "actions",
            label: "Actions",
            render: (item) => {
                return (
                    <div className="admin-tables-button-wrapper">
                        <Link className="update-btn" to={`/admin/categories/update/${item?.slug}`}>Update</Link>
                        <button className="delete-btn" onClick={() => {
                            setSelectedCatId(item?.id)
                            setIsModalInvalid(true)
                            setIsModalOpen(true)
                        }}>Delete</button>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        refetch()
    }, [refetch]);

    if(isError) {
        console.log(error)
    }

    if(isLoading || isFetching) {
        return <Loader />
    }

    return (
        <section className="admin-category-list">
            <CustomTable data={data} tableKey="id" columns={tableColumns} tableClass="admin-category-table" />
            {isModalInvalid && (
                <AlertModal onOpen={isModalOpen} onClose={() => setIsModalOpen(false)} alertMessage="Are you sure you want to delete the this category?" submitButtonText="Delete Category" submit={handleDeleteCategory} modalRef={modalRef} />
            )}
        </section>
    );
};

export default AdminCategoriesPage;