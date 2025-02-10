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
import { getAllRoomsByAdmin } from "../../services/room.services";
import SearchFilterHeader from "../../components/manage/SearchFilterHeader";
import { getAllUserByAdmin } from "../../services/user.services";
import {
  generateFallbackAvatar,
  handleActionNotSupport,
} from "../../utils/helpers";
import { translateRank } from "../../utils/common";

const { confirm } = Modal;

const ManageUser = () => {
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
          const responseGetAllItem = await getAllUserByAdmin();
          setOriginalData([...responseGetAllItem].reverse());
          setProcessingData([...responseGetAllItem].reverse());
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
        item.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categoryFilter) {
      updatedData = updatedData.filter((item) => {
        return item.membership === categoryFilter;
      });
    }

    setProcessingData(updatedData);
  }, [searchText, categoryFilter, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setCategoryFilter(undefined);
    setProcessingData(originalData);
  };


  const columns = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={record.avatar_url || generateFallbackAvatar(record.fullname)}
            alt={record.name}
            style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
            size={55}
          />
          <div>
            <div className="text-base">{record.fullname}</div>
            <div className="opacity-70">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone",
      render: (phone) =>
        phone ? phone : <i className="text-xs opacity-70">(Chưa cập nhật)</i>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (address) =>
        address ? (
          address
        ) : (
          <i className="text-xs opacity-70">(Chưa cập nhật)</i>
        ),
    },
    {
      title: "Hội viên",
      dataIndex: "membership",
      key: "membership",
      render: (membership) => translateRank(membership),
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (text, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="view">
              <Button
                type="link"
                onClick={() => {
                  handleActionNotSupport();
                }}
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

  return (
    <div>
      <div className="header-order">
        <SearchFilterHeader
          searchPlaceholder="Tìm kiếm người dùng bằng email"
          searchValue={searchText}
          onSearchChange={setSearchText}
          haveFilter={true}
          filters={[
            {
              label: "Hội viên",
              options: [
                { label: "Bình thường", value: "Normal" },
                { label: "Bạc", value: "Silver" },
                { label: "Vàng", value: "Gold" },
                { label: "Kim Cương", value: "Diamond" },
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

export default ManageUser;
