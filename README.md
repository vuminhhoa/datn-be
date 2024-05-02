===================== DONE ===============================
- bỏ cập nhật role ở profile -> done
- bỏ cập nhật khoa phòng ở profile -> done
- sửa lại giao diện chỗ tải tài liệu mua sắm đấu thầu -> done
- sửa lại icon quản lý thành viên danh sách thành viên ->done
- sửa lại layout, header full, logo bộ y tế + chữ phòng vật tư y tế bên cạnh -> done
- thêm role người dùng dưới tên ở header -> done
- sửa lại logo byt trên tab + chữ: HUST 2024 - ĐATN - Vũ Minh Hòa -> done
- thêm màn thông báo chưa hỗ trợ giao diện điện thoại khi màn hình nhỏ -> done
- cập nhật background auth page
- sửa lại giao diện cập nhật vai trò các vai trò được list theo cây
- thêm màn tạo role mới
- thêm nút xóa vai trò ở màn xem chi tiết vai trò
- sửa breadcrumb ko render lại page
- cập nhật role -> done
	admin - là dev: full chức năng hệ thống + chỉnh sửa hệ thống => role hệ thống ko xóa đc
	user - người dùng: các chức năng xem => role hệ thống ko xóa đc
	------- role tạo thêm -------
	=> có thể xóa thêm tùy ý
 	quản lý: full chức năng hệ thống
	nhân viên: chỉ các quyền xem
	gvhd
	...
- cập nhật chức năng hệ thống => done
	chức năng của hệ thống:
	- màn xem trang tổng quan
	- chức năng quản lý thành viên
		màn danh sách thành viên 
			xóa thành viên
			tạo mới thành viên
			xem chi tiết thành viên 
		màn chi tiết thành viên  
			cập nhật thành viên
	- chức năng quản lý thiết bị
		màn xem danh sách thiết bị
			tạo mới thiết bị
			xem chi tiết 
			xóa
		màn xem chi tiết
			cập nhật thiết bị
	- chức năng quản lý hoạt động mua sắm
		màn xem danh sách hoạt động mua sắm qua đấu thầu
			tạo mới hoạt động
			xem chi tiết
			xóa hoạt động
		màn xem chi tiết hoạt động
			cập nhật phần lập kế hoạch
			cập nhật phần khoa phòng đề xuất
			lưu cập nhật
	- chức năng quản lý phân quyền
		màn xem danh sách các vai trò trong hệ thống
			xem chi tiết một vai trò
			tạo mới vai trò
			xóa vai trò
		màn xem chi tiết vai trò
			chỉnh sửa vai trò
			xóa vai trò
- thêm auth + permission middleware backend => done
- sửa lại màn xem chi tiết thiết bị, hiện đang nhảy sag chi tiết role !important



===================== TODO ===============================
- thêm màn home !important:  số lượng thành viên, số lượng thiết bị, số lượng hoạt động, số lượng vai trò, 
- xóa phần khoa phòng của người dùng => do đề tài chỉ sử dụng ở phòng vật tư
- thêm phần nhà thầu nộp e hsdt ở hoạt động mua sắm qua đấu thầu !important
- update ci cd, đẩy code tự deploy prod
- sửa lại màn edit role, nếu chọn role xem thì bình thường, nếu chọn role liên quan đến write permisison thì tự động chọn role read
- thêm modal cảnh báo xóa role
- sửa lại các chỗ open modal, disabled nút trigger, disabled nút cancel khi updating/creating

===================== READY ===============================
- sửa lại màn xem chi tiết thiết bị, các thiết bị được nhập từ hoạt động mua sắm sẽ có thêm description: được nhập từ hoạt động mua sắm xxx, bấm xxx nhảy sang trang chi tiết hoạt động mua sắm đấy


- thêm phần quản lý hoạt động mua sắm ko qua đấu thầu
- thêm ô tìm kiếm, list theo khoa phòng ở quản lý thiết bị

- thêm logo phòng vật tư y tế + footer hust datn @2024 trang login / signin
- thêm animation collapsible cho bidding item
- thêm ô tìm kiếm, list theo vai trò ở quản lý thành viên
- thêm chức năng cập nhật thông tin khoa phòng đề xuất ở hoạt động mua sắm đấu thầu
- thêm chức năng check file ảnh update profile/user
- thêm chức năng đăng ký add sẵn role dựa vào tên email để phục vụ test

- bug đăng ký lỗi db ko hiện toast






