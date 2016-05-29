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
		<div class="cert-main">
			<div class="cert-3c">
				<div class="cert-3c-top clearfix">
					<div class="s-n">零件号：<?= $partNo;?></div>
					<div class="s-n">中文名：<?= $name;?></div>
				</div>
				<div class="cert-3c-list">
					<table>
						<thead>
							<tr>
								<th>全部3C证书</th>
							</tr>
						</thead>
						<tbody id="J_lists"></tbody>
					</table>
					<div class="lists-pages">
						<div class="count">共<span id="J_count"></span>页</div>
						<ul class="pages clearfix" id="J_pages"></ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php $this->beginBlock("bottomcode"); ?>
<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="/js/layer/layer.js"></script>
<script type="text/javascript" src="/js/port.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/Calendar.js"></script>
<script type="text/javascript">var $partId = '<?= $partId;?>';</script>
<script type="text/x-jquery-tmpl" id="certListTmpl">
<tr>
	<td>
		<div class="list clearfix">
			<div class="certNo">证书号：${filename}<br>有效日期：${startDate} 至 ${endDate}</div>
			<div class="upTime">上传时间：${uploadTime}</div>
			<div class="downld"><a href="http://120.26.50.11:8010${file}" target="_blank" title="下载">下载</a></div>
			<div class="delete"><a href="javascript:;" class="btn-delete" data-delid="${id}" title="删除">删除</a></div>
		</div>
	</td>
</tr>
</script>
<script type="text/javascript" src="/js/partcert.js"></script>
<?php $this->endBlock();  ?>