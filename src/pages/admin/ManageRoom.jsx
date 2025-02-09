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
} from "antd";
import React, { useEffect, useState } from "react";
import { BiDetail, BiUpload } from "react-icons/bi";
import { VscFolderActive } from "react-icons/vsc";
import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";
import { MdBlock } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { PiPlus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import { getAllRooms } from "../../services/room.services";
import SearchFilterHeader from "../../components/manage/SearchFilterHeader";
import { formatCurrencyToVND } from "../../utils/helpers";

const { confirm } = Modal;

const ManageRoom = () => {
  const navigate = useNavigate();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const userData = useSelector(userSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [processingData, setProcessingData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [availabilityValue, setAvailabilityValue] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (userData) {
        setIsLoading(true);
        try {
          const responseGetAllItem = await getAllRooms();

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

    if (categoryFilter) {
      updatedData = updatedData.filter((item) => {
        if (categoryFilter === "Others") {
          return item.category !== "Food" && item.category !== "Beverage";
        }
        return item.category === categoryFilter;
      });
    }

    setProcessingData(updatedData);
  }, [searchText, categoryFilter, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setCategoryFilter(undefined);
    setProcessingData(originalData);
  };

  const beforeUploadImage = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("Chỉ chấp nhận file hình ảnh vào ô này!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "item_name",
      key: "item_name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            shape="square"
            src={record.image_url}
            alt={record.item_name}
            style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
            size={55}
          />
          <div>
            <div className="text-base">{record.item_name}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) =>
        category ? (
          category
        ) : (
          <i className="text-xs opacity-70">(Chưa cập nhật)</i>
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{formatCurrencyToVND(price)} đ</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (Description) =>
        Description ? (
          Description
        ) : (
          <i className="text-xs opacity-70">(Chưa cập nhật)</i>
        ),
    },
    {
      title: "Status",
      dataIndex: "availability",
      key: "availability",
      width: "200px",
      render: (availability) => {
        return (
          <div className="flex items-center gap-2">
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: availability === 1 ? "#00FF19" : "#FF002E",
              }}
            />
            <span>
              {availability === 1 ? "Available" : "No longer available"}
            </span>
          </div>
        );
      },
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
                onClick={() => {}}
                icon={<BiDetail style={{ fontSize: "20px" }} />}
                style={{ color: "black" }}
                className="flex items-center"
              >
                Edit
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
              label: "Category",
              options: [
                { label: "Food", value: "Food" },
                { label: "Beverage", value: "Beverage" },
                { label: "Others", value: "Others" },
              ],
              value: categoryFilter,
              onChange: setCategoryFilter,
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
    </div>
  );
};

export default ManageRoom;
