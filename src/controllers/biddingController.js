import { Bidding } from '../models/index.js';
import cloudinary from '../services/cloudinaryService.js';
import { getCloudinaryFileIdFromUrl } from '../helpers/cloudinaryHelper.js';

export async function createBidding(req, res) {
  try {
    const data = req.body;
    console.log(data);
    const createdBidding = await Bidding.create({ ...data });
    return res.send({ data: createdBidding, success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function updateBidding(req, res) {
  try {
    const data = req.body;
    const filteredData = filterFields(data, ['updatedAt', 'createdAt']);
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

    return res.send(prepareDate(bidding));
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
      raw: true,
    });
    return res.send(prepareDate(biddings));
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
  if (Array.isArray(objOrArray)) {
    return objOrArray.map((obj) => {
      for (const field of fields) {
        if (field in obj) {
          obj[field] = new Date(obj[field]).toLocaleString();
        }
      }
      return obj;
    });
  } else {
    for (const field of fields) {
      if (field in objOrArray) {
        objOrArray[field] = new Date(objOrArray[field]).toLocaleString();
      }
    }
    return objOrArray;
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
