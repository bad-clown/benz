/*

 */
var _host_ = $_Path + 'index.php';

var urlPort = {
	//物流列表
	shipment : _host_+'?r=benz/shipment-list',
	//物流删除
	shipmentDel : _host_+'?r=benz/shipment-del',
	//上传xls文件
	shipmentUpload : _host_+'?r=benz/shipment-upload',
	//零件列表
	certList : _host_+'?r=benz/cert-list',
	//证书检测
	certLatest : _host_+'?r=benz/cert-latest',
	//零件检测
	hasPart : _host_+'?r=benz/has-part',
	//证书上传
	doCertImport : _host_+'?r=benz/do-cert-import',
	//上传PDF文件
	uploadCert : _host_+'?r=benz/upload-cert',
	//预约列表
	reservationList : _host_+'?r=benz/reservation-list',
	//证书列表
	partCertList : _host_+'?r=benz/part-cert-list',
	//证书删除
	partCertDel : _host_+'?r=benz/part-cert-del',
	//账号列表
	userList : _host_+'?r=benz/user-list',
	//新增账号
	createUser : _host_+'?r=benz/create-user',
	//禁用/启用
	blockUser : _host_+'?r=benz/block-user',
	//重置密码：
	resetPwd : _host_+'?r=benz/reset-user-password',
	//修改用户信息：
	modifyPersonal : _host_+'?r=benz/modify-personal',
	//修改密码：
	changePwd : _host_+'?r=benz/change-password',

	/* 局端 */
	//预约查检列表：
	BureauReservationList : _host_+'?r=bureau/reservation-list',
	//提交预约：
	BureauDoReservation : _host_+'?r=bureau/do-reservation',
	//修改预约：
	BureauModReservation : _host_+'?r=bureau/mod-reservation',
	//国检\企业 账号列表：
	BureauUserList : _host_+'?r=bureau/user-list',
	//创建国检账号：
	BureauCreateGuoUser : _host_+'?r=bureau/create-guo-user',
	//创建企业账号：
	BureauCreateQiUser : _host_+'?r=bureau/create-qi-user',
	//修改国检账号：
	BureauUpdateGuoUser : _host_+'?r=bureau/update-guo-user',
	//修改企业账号：
	BureauUpdateQiUser : _host_+'?r=bureau/update-qi-user',
	//关联国检账号：
	BureauGuoUserList : _host_+'?r=bureau/guo-user-list',
	//禁用/启用
	BureauBlockUser : _host_+'?r=bureau/block-user',
	//重置密码：
	BureauResetPwd : _host_+'?r=bureau/reset-user-password',
	//修改用户信息：
	BureauModifyPersonal : _host_+'?r=bureau/modify-personal',
	//修改密码：
	BureauChangePwd : _host_+'?r=bureau/change-password'

}



