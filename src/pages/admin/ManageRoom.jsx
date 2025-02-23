import {
  Spin,
  Table,
  Button,
  Avatar,
  Menu,
  Dropdown,
  TableProps,
  Modal,
  Form,
  Upload,
  Input,
  Switch,
  InputNumber,
  Select,
  Image,
} from "antd";
import React, { useEffect, useState } from "react";
import { BiCheck, BiDetail, BiUpload } from "react-icons/bi";
import { VscFolderActive } from "react-icons/vsc";
import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";
import { MdBlock, MdCancel, MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import {
  approveRoomForAdmin,
  getAllRoomsByAdmin,
  rejectRoomForAdmin,
} from "../../services/room.services";
import SearchFilterHeader from "../../components/manage/SearchFilterHeader";
import {
  EnvironmentIcon,
  formatCurrencyToVND,
  formatDateTimeVN,
  ObjectIcon,
  UtilityIcon,
} from "../../utils/helpers";
import {
  generateOptions,
  translateHousingCategory,
  translateHousingType,
} from "../../utils/common";
import {
  housingCategoryTranslation,
  housingStatusTranslation,
  housingTypeTranslation,
} from "../../utils/constants";

const { confirm } = Modal;

const ManageRoom = () => {
  const navigate = useNavigate();
  const userData = useSelector(userSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [processingData, setProcessingData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState(undefined);
  const [categoryFilter, setCategoryFilter] = useState(undefined);
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (userData) {
        setIsLoading(true);
        try {
          const responseGetAllItem = await getAllRoomsByAdmin();

          const sortedData = [...responseGetAllItem].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setOriginalData(sortedData);
          setProcessingData(sortedData);
        } catch (error) {
          toast.error("There was an error loading data!");
          toast.error(error.response?.data?.message);
          console.error("There was an error loading data!:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((item) =>
        item.item_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (typeFilter) {
      updatedData = updatedData.filter((item) => {
        return item.type === typeFilter;
      });
    }

    if (categoryFilter) {
      updatedData = updatedData.filter((item) => {
        return item.category === categoryFilter;
      });
    }

    if (statusFilter) {
      updatedData = updatedData.filter((item) => {
        return item.status === statusFilter;
      });
    }

    setProcessingData(updatedData);
  }, [searchText, typeFilter, categoryFilter, statusFilter, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setCategoryFilter(undefined);
    setTypeFilter(undefined);
    setStatusFilter(undefined);
    setProcessingData(originalData);
  };

  const showRoomDetails = (room) => {
    setSelectedItem(room);
    setIsDetailModalVisible(true);
  };

  const handleApprove = async () => {
    setIsLoadingAction(true);
    try {
      await approveRoomForAdmin(selectedItem._id, "active");
      toast.success("Phòng đã được phê duyệt!");

      setOriginalData((prevData) =>
        prevData.map((room) =>
          room._id === selectedItem._id ? { ...room, status: "active" } : room
        )
      );
      setProcessingData((prevData) =>
        prevData.map((room) =>
          room._id === selectedItem._id ? { ...room, status: "active" } : room
        )
      );

      setIsDetailModalVisible(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi phê duyệt!");
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối!");
      return;
    }
    setIsLoadingAction(true);
    try {
      const data = {
        reason_rejected: rejectReason,
      };
      await rejectRoomForAdmin(selectedItem._id, "rejected", data);
      toast.success("Phòng đã bị từ chối!");

      setOriginalData((prevData) =>
        prevData.map((room) =>
          room._id === selectedItem._id
            ? { ...room, status: "rejected", reason_rejected: rejectReason }
            : room
        )
      );
      setProcessingData((prevData) =>
        prevData.map((room) =>
          room._id === selectedItem._id
            ? { ...room, status: "rejected", reason_rejected: rejectReason }
            : room
        )
      );

      setIsRejectModalVisible(false);
      setIsDetailModalVisible(false);
    } catch (error) {
      console.log("error: ", error);
      toast.error("Có lỗi xảy ra khi từ chối!");
      toast.error(error?.response?.data);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "img_links",
      key: "img_links",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            shape="square"
            src={record.img_links[0]}
            alt="Ảnh trọ"
            style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
            width={55}
          />
        </div>
      ),
    },
    {
      title: "Hình thức",
      dataIndex: "type",
      key: "type",
      render: (type) => translateHousingType(type),
    },
    {
      title: "Loại trọ",
      dataIndex: "category",
      key: "category",
      render: (category) => translateHousingCategory(category),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{formatCurrencyToVND(price)} VND/1 tháng</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "200px",
      render: (status) => {
        const statusConfig = {
          active: {
            color: "#15803d",
            bgColor: "#bbf7d0",
            label: "Đang hiệu lực",
          },
          inactive: {
            color: "oklch(0.278 0.033 256.848)",
            bgColor: "oklch(0.928 0.006 264.531)",
            label: "Hết hiệu lực",
          },
          under_review: {
            color: "oklch(0.438 0.218 303.724)",
            bgColor: "oklch(0.946 0.033 307.174)",
            label: "Đang chờ duyệt",
          },
          rejected: {
            color: "oklch(0.444 0.177 26.899)",
            bgColor: "oklch(0.885 0.062 18.334)",
            label: "Bị từ chối",
          }
        };

        const { color, bgColor, label } =
          statusConfig[status] || statusConfig.inactive;

        return (
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: bgColor,
                color: color,
                padding: "4px 8px",
                borderRadius: "4px",
                fontWeight: "600",
                fontSize: "12px",
              }}
            >
              {label}
            </span>
          </div>
        );
      },
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <span>{formatDateTimeVN(date)}</span>,
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (text, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit">
              <Button
                type="link"
                onClick={() => showRoomDetails(record)}
                icon={<BiDetail style={{ fontSize: "20px" }} />}
                style={{ color: "black" }}
                className="flex items-center"
              >
                Chi tiết
              </Button>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              type="link"
              icon={<IoIosMore style={{ fontSize: "24px" }} />}
            />
          </Dropdown>
        );
      },
    },
  ];

  const typeOptions = generateOptions(housingTypeTranslation);
  const categoryOptions = generateOptions(housingCategoryTranslation);
  const statusOptions = generateOptions(housingStatusTranslation);

  return (
    <div>
      <div className="header-order">
        <SearchFilterHeader
          searchPlaceholder="Tìm kiếm phòng"
          searchValue={searchText}
          onSearchChange={setSearchText}
          haveFilter={true}
          filters={[
            {
              label: "Hình thức",
              options: typeOptions,
              value: typeFilter,
              onChange: setTypeFilter,
            },
            {
              label: "Loại trọ",
              options: categoryOptions,
              value: categoryFilter,
              onChange: setCategoryFilter,
            },
            {
              label: "Trạng thái",
              options: statusOptions,
              value: statusFilter,
              onChange: setStatusFilter,
            },
          ]}
          handleClearFilters={handleClearFilters}
        />
      </div>

      <div className="mt-8">
        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={processingData}
            rowKey={(record) => record.item_id}
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </div>

      {selectedItem && (
        <Modal
          title={<h2 className="text-xl font-semibold">Chi Tiết Phòng</h2>}
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          width={1000}
          style={{ top: 50 }}
          footer={[
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              Đóng
            </Button>,
            selectedItem?.status === "under_review" && (
              <>
                <Button
                  key="reject"
                  danger
                  onClick={() => setIsRejectModalVisible(true)}
                >
                  Từ chối
                </Button>
                <Button
                  key="approve"
                  type="primary"
                  onClick={handleApprove}
                  disabled={isLoadingAction}
                >
                  {isLoadingAction ? <Spin size="small" /> : "Phê duyệt"}
                </Button>
              </>
            ),
          ]}
        >
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedItem?.title}
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <Image.PreviewGroup>
                {selectedItem.img_links.map((img, index) => (
                  <Image
                    key={index}
                    className="rounded-md border border-gray-200"
                    width={120}
                    height={120}
                    src={img}
                    alt={`Ảnh ${index + 1}`}
                  />
                ))}
              </Image.PreviewGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Hình thức:</strong>{" "}
                {translateHousingType(selectedItem.type)}
              </p>
              <p>
                <strong>Loại trọ:</strong>{" "}
                {translateHousingCategory(selectedItem.category)}
              </p>
              <p>
                <strong>Giá:</strong> {formatCurrencyToVND(selectedItem.price)}{" "}
                VND/tháng
              </p>
              <p>
                <strong>Diện tích:</strong> {selectedItem.area} m²
              </p>
              <p>
                <strong>Địa chỉ:</strong> {selectedItem.address}
              </p>
              <p>
                <strong>Mô tả:</strong> {selectedItem.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <strong>Đối tượng:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedItem.objects.map((obj, index) => (
                    <ObjectIcon key={index} name={obj} />
                  ))}
                </div>
              </div>

              <div>
                <strong>Môi trường:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedItem.environments.map((env, index) => (
                    <EnvironmentIcon key={index} name={env} />
                  ))}
                </div>
              </div>

              <div>
                <strong>Tiện ích:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedItem.utilities.map((util, index) => (
                    <UtilityIcon key={index} name={util} />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
              <div className="grid grid-cols-2">
                <p>
                  <strong>Họ tên:</strong> {selectedItem.contact_fullname}
                </p>
                <p>
                  <strong>Điện thoại:</strong> {selectedItem.contact_phone}
                </p>
                <p>
                  <strong>Email:</strong> {selectedItem.contact_email}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {selectedItem.contact_address}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <strong>Trạng thái:</strong>
              <span
                className={`ml-2 px-3 py-1 text-sm rounded-md 
      ${selectedItem.status === "active" ? "bg-green-200 text-green-700" : ""}
      ${selectedItem.status === "inactive" ? "bg-gray-200 text-gray-700" : ""}
      ${
        selectedItem.status === "under_review"
          ? "bg-purple-100 text-purple-800"
          : ""
      }
      ${selectedItem.status === "rejected" ? "bg-red-100 text-red-800" : ""}`}
              >
                {selectedItem.status === "active"
                  ? "Đang hiệu lực"
                  : selectedItem.status === "inactive"
                  ? "Hết hiệu lực"
                  : selectedItem.status === "under_review"
                  ? "Đang chờ duyệt"
                  : "Bị từ chối"}
              </span>
            </div>

            {selectedItem.status === "rejected" &&
              selectedItem.reason_rejected && (
                <div className="p-3 border border-red-300 bg-red-100 rounded-md">
                  <strong className="text-red-800">Lý do từ chối:</strong>
                  <p className="text-red-800">{selectedItem.reason_rejected}</p>
                </div>
              )}
          </div>
        </Modal>
      )}

      {isRejectModalVisible && (
        <Modal
          title="Nhập lý do từ chối"
          open={isRejectModalVisible}
          onCancel={() => setIsRejectModalVisible(false)}
          footer={[
            <Button
              key="cancel"
              onClick={() => setIsRejectModalVisible(false)}
              disabled={isLoadingAction}
            >
              Hủy
            </Button>,
            <Button
              key="confirm"
              type="primary"
              danger
              onClick={handleRejectConfirm}
              disabled={isLoadingAction}
            >
              {isLoadingAction ? <Spin size="small" /> : "Xác nhận"}
            </Button>,
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Nhập lý do từ chối..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            disabled={isLoadingAction}
          />
        </Modal>
      )}
    </div>
  );
};

export default ManageRoom;
