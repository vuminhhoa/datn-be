import { Bidding, Activity, Equipment } from '../models/index.js';
import cloudinary from '../services/cloudinaryService.js';
import { getCloudinaryFileIdFromUrl } from '../helpers/cloudinaryHelper.js';

export async function createBidding(req, res) {
  try {
    const data = req.body;
    const createdBidding = await Bidding.create({ ...data });
    await Activity.create({
      actor: req.user,
      action: `đã tạo mới hoạt động mua sắm đấu thầu`,
      target: {
        id: createdBidding.id,
        name: createdBidding.tenDeXuat,
        type: 'bidding',
      },
    });
    return res.send({ data: createdBidding, success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function updateBidding(req, res) {
  try {
    const data = req.body;
    const filteredData = filterFields(data, [
      'updatedAt',
      'createdAt',
      'deletedFields',
    ]);
    const biddingInDb = await Bidding.findOne({
      where: {
        id: data.id,
      },
      raw: true,
    });
    if (!biddingInDb) {
      return res.send({
        success: false,
        message: 'Hoạt động không tồn tại trên hệ thống!',
      });
    }
    const documentFieldsObj = removeNullFields(pickTaiLieuFields(filteredData));
    const documentsArrayData = Object.entries(documentFieldsObj).map(
      ([key, value]) => ({
        key,
        value,
      })
    );

    if (data.deletedFields.length !== 0) {
      for (const field of data.deletedFields) {
        const oldFileId = decodeURIComponent(
          getCloudinaryFileIdFromUrl({
            url: biddingInDb[field],
            useExt: true,
          })
        );
        await cloudinary.uploader.destroy(oldFileId, {
          resource_type: 'raw',
        });
      }
    }

    for (const document of documentsArrayData) {
      if (document.value === biddingInDb[document.key]) {
        continue;
      }
      if (biddingInDb[document.key]) {
        const oldFileId = decodeURIComponent(
          getCloudinaryFileIdFromUrl({
            url: biddingInDb[document.key],
            useExt: true,
          })
        );
        await cloudinary.uploader.destroy(oldFileId, {
          resource_type: 'raw',
        });
      }

      const { fileBase64, fileName } = JSON.parse(document.value);

      const result = await cloudinary.uploader.upload(fileBase64, {
        folder: 'bidding_documents',
        resource_type: 'raw',
        use_filename: true,
        filename_override: fileName,
      });
      filteredData[document.key] = result?.secure_url;
    }

    await Bidding.update(filteredData, {
      where: {
        id: filteredData.id,
      },
    });
    await Activity.create({
      actor: req.user,
      action: `đã cập nhật hoạt động mua sắm đấu thầu`,
      target: {
        id: filteredData.id,
        name: filteredData.tenDeXuat,
        type: 'bidding',
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật hoạt động thất bại',
      error: error,
    });
  }
}

export async function deleteBidding(req, res) {
  try {
    const { id } = req.params;
    const biddingInDb = await Bidding.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!biddingInDb) {
      return res.send({
        success: false,
        message: 'Hoạt động không tồn tại trên hệ thống!',
      });
    }

    const documentFieldsObj = removeNullFields(pickTaiLieuFields(biddingInDb));
    const documentsArrayData = Object.entries(documentFieldsObj).map(
      ([key, value]) => ({
        key,
        value,
      })
    );

    if (documentsArrayData.length !== 0) {
      for (const document of documentsArrayData) {
        const oldFileId = decodeURIComponent(
          getCloudinaryFileIdFromUrl({
            url: biddingInDb[document.key],
            useExt: true,
          })
        );
        await cloudinary.uploader.destroy(oldFileId, {
          resource_type: 'raw',
        });
      }
    }
    await Activity.create({
      actor: req.user,
      action: `đã xóa hoạt động mua sắm đấu thầu`,
      target: {
        id: biddingInDb.id,
        name: biddingInDb.tenDeXuat,
        type: 'bidding',
      },
    });

    await Bidding.destroy({
      where: {
        id: id,
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Xóa hoạt động thất bại',
      error: error,
    });
  }
}

export async function getOneBidding(req, res) {
  try {
    const { id } = req.params;
    const bidding = await Bidding.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
    if (!bidding) {
      return res.send({
        success: false,
        message: 'Hoạt động không tồn tại trên hệ thống!',
      });
    }
    return res.send({ data: prepareDate(bidding), success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu hoạt động thất bại',
      error: error,
    });
  }
}

export async function getListBiddings(req, res) {
  try {
    const biddings = await Bidding.findAll({
      attributes: [
        'id',
        'tenDeXuat',
        'khoaPhongDeXuat',
        'trangThaiDeXuat',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Equipment,
          attributes: ['soLuong', 'donGia'],
        },
      ],
    });

    const plainBiddings = biddings.map((bidding) =>
      bidding.get({ plain: true })
    );

    const biddingsWithTotals = plainBiddings.map((bidding) => {
      const totalEquipments = bidding.Equipment.reduce(
        (sum, equipment) => sum + equipment.soLuong,
        0
      );
      const totalPrice = bidding.Equipment.reduce(
        (sum, equipment) => sum + equipment.soLuong * equipment.donGia,
        0
      );

      return {
        ...bidding,
        totalEquipments,
        totalPrice,
      };
    });

    return res.send({ data: biddingsWithTotals, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu hoạt động thất bại',
      error: error,
    });
  }
}

function prepareDate(objOrArray) {
  const fields = ['createdAt', 'updatedAt'];
  const seen = new WeakSet();

  function processObject(obj) {
    if (seen.has(obj)) {
      return obj;
    }
    seen.add(obj);

    for (const field of fields) {
      if (field in obj) {
        obj[field] = new Date(obj[field]).toLocaleString();
      }
    }

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        processObject(obj[key]);
      }
    }

    return obj;
  }

  if (Array.isArray(objOrArray)) {
    return objOrArray.map((obj) => processObject(obj));
  } else {
    return processObject(objOrArray);
  }
}

function filterFields(obj, fieldsToRemove) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fieldsToRemove.includes(key))
  );
}

function pickTaiLieuFields(object) {
  const taiLieuFields = {};
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      key.startsWith('taiLieu')
    ) {
      taiLieuFields[key] = object[key];
    }
  }
  return taiLieuFields;
}

function removeNullFields(object) {
  const result = {};
  for (const key in object) {
    if (object[key] !== null) {
      result[key] = object[key];
    }
  }
  return result;
}
