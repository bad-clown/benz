<?php

/*
 * This file is part of the Dektrium project.
 *
 * (c) Dektrium project <http://github.com/dektrium>
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use hipstercreative\user\widgets\Connect;
use app\models\Dictionary;
$Path = Dictionary::indexKeyValue('App', 'Host', false);
/**
 * @var yii\web\View $this
 * @var yii\widgets\ActiveForm $form
 * @var hipstercreative\user\models\LoginForm $model
 */

$this->title = Yii::t('user', 'Sign in');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="benzContainer">
	<div class="top-bar">
		<?= $this->render('username') ?>
	</div>
	<div class="left-nav">
		<?= $this->render('menu') ?>
	</div>
	<div class="right-main">
		<div class="shipment-detail bureau-reservation-detail">
			<?php if($shipment->reservation == null) {?>
			<div class="shipment-state clearfix">
				<h3>未预约</h3>
				<a href="javascript:;" class="btn-add" id="J_check">新增预约</a>
			</div>
			<?php }else{ ?>
			<div class="shipment-state clearfix">
				<h3>已预约</h3>
				<a href="javascript:;" class="btn-add" id="J_check">重新预约</a>
			</div>
			<?php }; ?>
			<div class="shipment-detail-top clearfix">
				<?php if(!$shipment->reservation == null) {?>
				<div class="s-n">查验日期：<?= $shipment->reservation['checkDate'];?></div>
				<?php } ?>
				<div class="s-n">到厂日期：<?= $shipment->arrivalDate;?></div>
				<div class="s-n">提单号：<?= $shipment->shipmentNo;?></div>
				<div class="s-n">发货号：<?= $shipment->BLNo;?></div>
			</div>
			<div class="shipment-detail-list">
				<div class="shipment-detail-thead">
					<table>
						<thead>
							<tr>
								<th width="20%" class="pl32"><input type="checkbox" id="J_checkAll" name="containerNo" value="" /> 集装箱号</th>
								<th width="13%"><span class="l-line pl10">装船号</span></th>
								<th width="15%"><span class="l-line pl10">船号</span></th>
								<th width="17%"><span class="l-line pl10">零件号</span></th>
								<th width="15%"><span class="l-line pl10">中文名</span></th>
								<th width="8%"><span class="l-line pl10">数量</span></th>
								<th width="22%"><span class="l-line pl10">3C证书</span></th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="shipment-detail-tbody h450">
					<table>
						<tbody>
							<?php
							if($shipment->reservation == null) {
								foreach($detail as $k => $v){
							?>
							<tr class="status<?= $v['certStatus'];?>">
								<td width="20%" class="pl32"><input type="hidden" name="partId" value="<?= $v['partId'];?>" placeholder=""><input type="checkbox" class="checkbox-list" name="containerNo" value="" /> <?= $v['containerNo'];?></td>
								<td width="13%"><span class="pl10"><?= $v['vesselNo'];?></span></td>
								<td width="15%"><span class="pl10"><?= $v['vesselName'];?></span></td>
								<td width="17%"><span class="pl10"><?= $v['partNo'];?></span></td>
								<td width="15%" title="<?= $v['partName'];?>"><span class="partName pl10"><?= $v['partName'];?></span></td>
								<td width="8%"><span class="pl10"><?= $v['count'];?></span></td>
								<td width="22%" class="pl10 s-i"><?php if($v['certStatus'] == 0){echo '未过期';}elseif($v['certStatus'] == 1){echo '将过期';}elseif($v['certStatus'] == 2){echo '已过期';};?></td>
							</tr>
							<?php }}else{
								foreach($detail as $k => $v){
									foreach($shipment->reservation->shipmentDetailIdList as $k2 => $v2){
										if($k == $v2) {
											$judge = true;
											break;
										}else{
											$judge = false;
										}
									}
							?>
							<tr class="<?php if(!$judge){echo 'nopass';};?> status<?= $v['certStatus'];?>">
								<td width="20%" class="pl32"><input type="hidden" name="partId" value="<?= $v['partId'];?>" placeholder=""><input type="checkbox" class="checkbox-list" name="containerNo" value="" /> <?= $v['containerNo'];?></td>
								<td width="13%"><span class="pl10"><?= $v['vesselNo'];?></span></td>
								<td width="15%"><span class="pl10"><?= $v['vesselName'];?></span></td>
								<td width="17%"><span class="pl10"><?= $v['partNo'];?></span></td>
								<td width="15%" title="<?= $v['partName'];?>"><span class="partName pl10"><?= $v['partName'];?></span></td>
								<td width="8%"><span class="pl10"><?= $v['count'];?></span></td>
								<td width="22%" class="pl10 s-i"><?php if($v['certStatus'] == 0){echo '未过期';}elseif($v['certStatus'] == 1){echo '将过期';}elseif($v['certStatus'] == 2){echo '已过期';};?></td>
							</tr>
							<?php }};?>
						</tbody>
					</table>
				</div>
				<!-- <a href="javascript:;" class="check-time" title="选择查验时间">选择查验时间</a> -->
			</div>
		</div>
	</div>
</div>

<!-- <div class="mailContent-popup">
	<h3>发送预约邮件</h3>
	<div class="mailContent-cont">
		<textarea name="mailContent" id="mailContent"></textarea>
		<button class="btn-confirm" id="J_Submit" title="发 送">发 送</button>
	</div>
</div> -->


<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/layer/layer.js"></script>
<script type="text/javascript" src="/js/port.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/Calendar.js"></script>
<script type="text/javascript">
$(function() {
	$('#benzMenu').find('.icon-yy').parent('li:eq(0)').addClass('active');

	$(document).on('click', '#J_check', function() {
		$('.nopass').show();
		$('.shipment-detail-list').find('input:checkbox').show()
		$('.bureau-reservation-detail').append('<a href="javascript:;" id="J_checktime" class="check-time" title="选择查验时间">选择查验时间</a>')
		$(this).data('r', $(this).html()).attr({id : 'J_cancel', class : 'btn-cancel'}).html('取消')
	})
	$(document).on('click', '#J_cancel', function() {
		$('.nopass').hide();
		$('#checkout-close').click();
		$('.shipment-detail-list').find('input:checkbox').hide()
		$('.bureau-reservation-detail').find('.check-time:eq(0)').remove();
		$(this).attr({id : 'J_check', class : 'btn-add'}).html($(this).data('r'))
	})

	$(document).on('click', '#J_checktime', function() {
		$('body').append('<div class="checkout-popup"><a href="javascript:;" class="btn-close" id="checkout-close" title="关闭">关闭</a><h3>查验时间</h3><div class="checkout-cont"><table><tbody><tr><td class="tit">&lowast;查验时间：</td><td class="con"><input type="text" class="time-text" name="" value="" placeholder="请选择查验时间" onClick="new Calendar().show(this);" readonly="readonly"></td></tr><tr><td colspan="2"><button class="btn-confirm" id="J_Submit" title="提 交">提 交</button></td></tr></tbody></table></div></div>');
	})

	$('.checkbox-list').on('click', function() {
		if($(this).is(":checked")) {
			$(this).parents('tr').addClass('bge1')
		}
		else {
			$(this).parents('tr').removeClass('bge1')
		}
	})

	$('#J_checkAll').on('click', function() {
		if($(this).is(":checked")) {
			$('input[name="containerNo"]').prop('checked', $(this).prop('checked')).parents('tr').addClass('bge1')
		}
		else {
			$('input[name="containerNo"]').prop('checked', $(this).prop('checked')).parents('tr').removeClass('bge1')
		}
	})

	$(document).on('click', '#J_Submit', function() {
		var partId = function() {
			var part = []
			$('.checkbox-list').each(function(i,o) {
				if($(o).is(':checked')){
					part.push($('input[name="partId"]').eq(i).val())
				}
			})
			return part
		}
		var detailId = partId()
		var _data = {
			shipmentId : '<?= $shipment->_id;?>',
			detailIdList : detailId,
			date : $.trim($('.time-text').eq(0).val())
		}

		if(detailId.length == 0) {layer.msg('未选中零件！');return}
		if(!$('.time-text').eq(0).val()) {layer.msg('未选择查验时间！');return}

		$.ajax({
			type : "POST",
			url : urlPort.BureauDoReservation,
			data : _data,
			success : function(data) {
				if(data.code == 0) {
					$('#checkout-close').click()
					$('body').append('<div class="yuyuesuc-popup"><h3>新增预约</h3><div class="yuyuesuc-msg"><p class="msg1">预约查验成功！</p><p class="msg2">已发送提醒邮件给对方</p></div><a href="javascript:;" class="btn-suc" id="J_yuyuesuc" title="确定">确定</a></div>');
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				layer.msg('提交失败，请检查网络后重试！')
			}
		})
	})

	$(document).on('click', '#J_yuyuesuc', function() {
		window.location.reload()
	})

	$(document).on('click', '#checkout-close', function() {
		$('.checkout-popup').remove();
	})
})
</script>
<?php $this->endBlock();  ?>