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
import { getAllUserByAdmin } from "../../services/user.services";
import {
  formatCurrencyToVND,
  formatDateTimeVN,
  generateFallbackAvatar,
  handleActionNotSupport,
} from "../../utils/helpers";
import { convertMembership, translateRank } from "../../utils/common";
import { getAllTransactionByAdmin } from "../../services/transaction.services";
import {
  PaymentMethodAdminName,
  PaymentMethodName,
} from "../../utils/constants";

const { confirm } = Modal;

const ManageTransaction = () => {
  const navigate = useNavigate();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const userData = useSelector(userSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [processingData, setProcessingData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [availabilityValue, setAvailabilityValue] = useState(1);
  const [methodFilter, setMethodFilter] = useState(undefined);
  const [typeFilter, setTypeFilter] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (userData) {
        setIsLoading(true);
        try {
          const responseGetAllItem = await getAllTransactionByAdmin();
          console.log("responseGetAllItem", responseGetAllItem);

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
        item.user_id.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (methodFilter) {
      updatedData = updatedData.filter((item) => {
        return item.payment_method === methodFilter;
      });
    }

    if (typeFilter) {
      updatedData = updatedData.filter((item) => {
        return item.transaction_type === typeFilter;
      });
    }

    setProcessingData(updatedData);
  }, [searchText, methodFilter, typeFilter, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setMethodFilter(undefined);
    setTypeFilter(undefined);
    setProcessingData(originalData);
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "user_id",
      key: "user",
      render: (user) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={user.avatar_url}
            alt={user.fullname}
            style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
            size={55}
          />
          <div>
            <div className="text-base">{user.fullname}</div>
            <div className="opacity-70">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Mã giao dịch",
      dataIndex: "transaction_code",
      key: "transaction_code",
      render: (transaction_code) => transaction_code,
    },
    {
      title: "Chi phí",
      dataIndex: "amount",
      key: "amount",
      render: (price) => <span>{formatCurrencyToVND(price)} đ</span>,
    },
    {
      title: "Phương thức",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (payment_method) => (
        <p>{PaymentMethodAdminName[payment_method]}</p>
      ),
    },
    {
      title: "Loại thanh toán",
      dataIndex: "transaction_type",
      key: "transaction_type",
      render: (transaction_type) => convertMembership(transaction_type),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color: "#52c41a",
            backgroundColor: "#f6ffed",
            padding: "4px 8px",
            borderRadius: "12px",
          }}
        >
          Thành công
        </span>
      ),
    },
    {
      title: "Thời điểm tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <span>{formatDateTimeVN(date)}</span>,
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
              label: "Phương thức thanh toán",
              options: [
                { label: "Internet Banking", value: "internet_banking" },
                { label: "VnPay", value: "vnpay" },
              ],
              value: methodFilter,
              onChange: setMethodFilter,
            },
            {
              label: "Loại thanh toán",
              options: [
                { label: "Nâng cấp hội viên", value: "up_membership" },
                { label: "Nạp tiền tài khoản", value: "add_funds" },
              ],
              value: typeFilter,
              onChange: setTypeFilter,
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

export default ManageTransaction;
