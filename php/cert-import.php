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
use app\modules\admin\models\Dictionary;
use app\modules\admin\logic\DictionaryLogic;
//$Path = DictionaryLogic::indexKeyValue('App', 'Host', false);
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
		<!-- 登录信息 -->
	</div>
	<div class="left-nav">
		<?= $this->render('menu') ?>
	</div>
	<div class="right-main">
		<div class="cert-main">
			<div class="cert-inc">
				<div class="cert-inc-title">导入3C证书</div>
				<div class="cert-inc-cont">
					<table>
						<tbody>
							<tr>
								<td class="tit">&lowast;证书号：</td>
								<td class="con">
									<input type="text" class="part-text" id="J_certNo" name="" value="" placeholder="请输入有效证书号">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td class="tit">&lowast;有效期：</td>
								<td class="con"><input type="text" class="part-text" name="" value="" placeholder="请选择开始时间" onClick="new Calendar().show(this);" readonly="readonly"> 至 <input type="text" class="part-text w160" name="" value="" placeholder="请选择结束时间" onClick="new Calendar().show(this);" readonly="readonly"></td>
							</tr>
							<tr>
								<td class="tit">&lowast;PDF文件：</td>
								<td class="con">
									<input type="text" class="part-text f-l" id="file-text" disabled="disabled" name="" value="" placeholder="请上传PDF文件">
									<div class="btn-file-box f-l">
										<a href="javascript:;" class="btn-upload" title="选择文件">选择文件</a>
										<input name="file" type="file" id="J_upload_pdf" class="file-upload">
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="cert-inc-title">关联零件</div>
				<div class="cert-inc-cont overflow-y-auto">
					<table>
						<tbody id="part-list">
							<tr>
								<td class="tit">&lowast;零件号：</td>
								<td class="con">
									<input type="text" class="partNo-text check_rep" name="" value="" placeholder="请输入零件号">
								</td>
								<td class="tit">&lowast;中文名：</td>
								<td class="con">
									<input type="text" class="name-text" name="" value="" placeholder="请输入中文名">
								</td>
								<td></td>
							</tr>
						</tbody>
					</table>
					<a href="javascript:;" class="btn-add" id="J_part_add" title="添加零件">添加零件</a>
				</div>
				<button class="btn-confirm" id="J_Upload" title="确定">确定</button>
			</div>
		</div>
	</div>
</div>
<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="/js/port.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/Calendar.js"></script>
<script type="text/javascript" src="/js/cert.js"></script>
<?php $this->endBlock();  ?>