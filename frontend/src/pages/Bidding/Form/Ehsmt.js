import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';

const Ehsmt = () => {
  const { data } = useContext(BiddingContext);

  const items = [
    { title: 'Dự thảo E-HSMT', field: 'ngayDuThaoEhsmt' },
    {
      title: 'Báo cáo xây dựng E-HSMT',
      field: 'ngayTaiLieuBcXayDungEhsmt',
    },
    {
      title: 'Phê duyệt E-HSMT tổ chuyên gia',
      field: 'ngayPheDuyetEhsmtToChuyenGia',
    },
    {
      title: 'Báo cáo thẩm định E-HSMT',
      field: 'ngayBcThamDinhEhsmt',
    },
    {
      title: 'Phê duyệt E-HSMT tổ thẩm định',
      field: 'ngayPheDuyetEhsmtToThamDinh',
    },
    {
      title: 'Quyết định phê duyệt E-HSMT',
      field: 'ngayPheDuyetEhsmt',
    },
    {
      title: 'Đăng thông báo mời thầu lên mạng đấu thầu',
      field: 'ngayDangThongBaoMoiThauLenMangDauThau',
    },
  ];

  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-300px' }}
      items={items.map((val) => {
        return {
          color: data[val.field]
            ? 'green'
            : data[val.field] === null
              ? 'gray'
              : 'orange',
          label: data[val.field] || ' ',
          children: <BiddingItem title={val.title} field={val.field} />,
        };
      })}
    />
  );
};

export default Ehsmt;
