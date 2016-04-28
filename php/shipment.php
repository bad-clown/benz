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

/**
 * @var yii\web\View $this
 * @var yii\widgets\ActiveForm $form
 * @var hipstercreative\user\models\LoginForm $model
 */

$this->title = Yii::t('user', 'Sign in');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="benz-container">
	<div class="top-bar">
		<!-- 登录信息 -->
	</div>
	<div class="left-nav">
		<ul>
			<li class="active">
				<a href="#" class="icon-wl" title="物流信息"><span>物流信息</span></a>
			</li>
			<li>
				<a href="#" class="icon-3c" title="3C证书"><span>3C证书</span></a>
			</li>
			<li>
				<a href="#" class="icon-yy" title="预约查询"><span>预约查询</span></a>
			</li>
			<li>
				<a href="#" class="icon-zh" title="账户管理"><span>账户管理</span></a>
			</li>
		</ul>
	</div>
	<div class="right-main">
		<div class="search-box">
			<a href="javascript:;" class="btn-download" title="下载模版">下载模版</a>
			<a href="javascript:;" class="btn-update" title="上传信息">上传信息</a>
			<div class="">
				<input type="text" class="text-search" name="" value="">
				<a href="javascript:;" class="btn-search" title="查询">查询</a>
			</div>
		</div>
		<div class="shipment-list">
			
		</div>
	</div>
</div>