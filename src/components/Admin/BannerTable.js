import React, { useCallback, useEffect, useState } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ReusableModal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../../context/redux/slices/bannerSlice";
import AddBannerForm from "./AddBannerForm";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import EditForm from "./EditBannerFrom";
import DeleteForm from "./DeleteForm";
import commonApis from "../../services/commonApis";

function BannerTable() {
  const [page, setPage] = useState(1);
  const [oneBannerData, setOneBannerData] = useState();
  const [bannerId, setBannerId] = useState(null);
  const [banners, setBanners] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const getAllBannersApi = useServices(commonApis.getAllBanner);
  const { banner } = useSelector((state) => state.banner);
  const addBanner = useServices(adminActionsApi.addBanner);
  const getOneBanner = useServices(adminActionsApi.getOneBanner);
  const updateOneBanner = useServices(adminActionsApi.editBanner);
  const deleteOneBanner = useServices(adminActionsApi.deleteBanner);
  const [hasFetched, setHasFetched] = useState(false);
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("addBanner");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addBannerhandle = async ({
    image,
    altText,
    forType,
    category,
    status,
  }) => {
    const formData = new FormData();
    formData.append("bannerImage", image);
    formData.append("altText", altText);
    formData.append("categoryId", category);
    formData.append("forType", forType);
    formData.append("status", status);
    const response = await addBanner.callApi(formData);
    handleClose();
    dispatch(fetchBanner());
    fetchBannersFn();
  };
  const getOneBannerHandle = useCallback(async (bannerId) => {
    const response = await getOneBanner.callApi(bannerId);
    setOneBannerData(response?.banner);
  });
  const updateBannerhandle = async ({
    image,
    altText,
    forType,
    category,
    status,
    bannerId,
  }) => {

    const formData = new FormData();
    formData.append("bannerImage", image);
    formData.append("altText", altText);
    formData.append("categoryId", category);
    formData.append("forType", forType);
    formData.append("status", status);
    const response = await updateOneBanner.callApi(bannerId, formData);
    console.log(response);

    handleClose();
    dispatch(fetchBanner());
    fetchBannersFn();
  };
  const deleteBannerHandle = async () => {
    const response = await deleteOneBanner.callApi(bannerId);

    handleClose();
    dispatch(fetchBanner());
    fetchBannersFn();
    setBannerId(null);
  };

  const fetchBannersFn = useCallback(async () => {
    const queryParams = { page: page || 1 };
    const response = await getAllBannersApi.callApi(queryParams);
    setBanners(response ? response.banners : []);
    setTotalPages(response ? response.totalPages : 1);
  }, [page]);

  const columns = [
    { label: "No", key: "index", render: (_, i) => (page - 1) * 10 + i + 1 },
    {
      label: "Banner",
      key: "BannerUrl",
      render: (row) => (
        <img
          src={process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + row.BannerUrl}
          alt="Banner"
          className="h-[5rem] object-cover rounded"
        />
      ),
    },
    { label: "Banner For", key: "forType" },

    {
      label: "Status",
      key: "status",
      render: (row) => (row?.status === true ? "Active" : "Deactive"),
    },
    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("editBanner"),
              getOneBannerHandle(row?._id),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("deleteBanner"),
              setBannerId(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchBannersFn();
  }, [page]);

  return (
    <div>
      <button
        onClick={() => [handleOpen(), setModalType("addBanner")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add Banner
      </button>
      <TableComponetWithApi
        columns={columns}
        data={banners}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={
          modalType === "addBanner"
            ? "Add Banner"
            : modalType === "editBanner"
              ? "Edit Banner"
              : modalType === "deleteBanner"
                ? "Delete Banner"
                : "Default Title"
        }
        width={"50%"}
      >
        {modalType === "addBanner" && (
          <AddBannerForm onSubmit={addBannerhandle} />
        )}
        {modalType === "editBanner" && (
          <EditForm
            existingData={oneBannerData}
            onSubmit={updateBannerhandle}
          />
        )}{" "}
        {modalType === "deleteBanner" && (
          <DeleteForm onDelete={deleteBannerHandle} />
        )}
      </ReusableModal>
    </div>
  );
}

export default BannerTable;
