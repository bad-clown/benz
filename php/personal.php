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
		<?= $this->render('username') ?>
	</div>
	<div class="left-nav">
		<?= $this->render('menu') ?>
	</div>
	<div class="right-main">
		<div class="personal-main">
			<div class="personal">
				<div class="personal-title">个人信息</div>
				<div class="personal-cont" id="userInfo">
					<div class="personal-cont-tit">基本信息</div>
					<table>
						<tbody>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>用户名：</td>
								<td class="con">
									<input type="text" class="user-text" disabled="disabled" name="username" value="<?= \Yii::$app->user->identity->username; ?>" placeholder="请输入用户名">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>姓名：</td>
								<td class="con">
									<input type="text" class="user-text" disabled="disabled" name="name" value="<?php if(\Yii::$app->user->identity->name){echo \Yii::$app->user->identity->name;}else{echo '暂无！';};?>" placeholder="请输入姓名">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>工号：</td>
								<td class="con">
									<input type="text" class="user-text" disabled="disabled" name="id" value="<?php if(\Yii::$app->user->identity->id){echo \Yii::$app->user->identity->id;}else{echo '暂无！';};?>" placeholder="请输入工号">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>部门：</td>
								<td class="con">
									<input type="text" class="user-text" disabled="disabled" name="department" value="<?php if(\Yii::$app->user->identity->department){echo \Yii::$app->user->identity->department;}else{echo '暂无！';};?>" placeholder="请输入部门">
									<p class="msg"></p>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="personal-cont-tit">联系方式</div>
					<table>
						<tbody>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>手机：</td>
								<td class="con">
									<input type="text" class="user-text" disabled="disabled" name="phone" value="<?php if(\Yii::$app->user->identity->phone){echo \Yii::$app->user->identity->phone;}else{echo '暂无！';};?>" placeholder="请输入手机">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>邮箱：</td>
								<td class="con">
									<input type="text" class="user-text" disabled="disabled" name="email" value="<?php if(\Yii::$app->user->identity->email){echo \Yii::$app->user->identity->email;}else{echo '暂无！';};?>" placeholder="请输入邮箱">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td class="tit">固话：</td>
								<td class="con">
									<input type="text" class="user-text" disabled="disabled" name="phone" value="<?php if(\Yii::$app->user->identity->phone){echo \Yii::$app->user->identity->phone;}else{echo '暂无！';};?>" placeholder="请输入固定电话">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<a href="javascript:;" id="J_AlterUser" class="btns btn-alter" title="修改">修改</a>
									<!-- <a href="javascript:;" class="btns btn-submit" title="提交">提交</a>
									<a href="javascript:;" class="btns btn-cancel" title="取消">取消</a> -->
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="personal-title">密码管理</div>
				<div class="personal-cont" id="pwdInfo">
					<table>
						<tbody>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>原密码：</td>
								<td class="con">
									<input type="password" class="pwd-text" disabled="disabled" name="current_password" value="<?= \Yii::$app->user->identity->current_password;?>" placeholder="请输入原密码">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>新密码：</td>
								<td class="con">
									<input type="password" class="pwd-text" disabled="disabled" name="password" value="" placeholder="请输入6-14位新密码">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td class="tit"><span class="lowast">&lowast;</span>新密码：</td>
								<td class="con">
									<input type="password" class="pwd-text" disabled="disabled" name="password" value="" placeholder="请再次输入新密码">
									<p class="msg"></p>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<a href="javascript:;" id="J_AlterPwd" class="btns btn-alter" title="修改">修改</a>
									<!-- <a href="javascript:;" class="btns btn-submit" title="提交">提交</a>
									<a href="javascript:;" class="btns btn-cancel" title="取消">取消</a> -->
								</td>
							</tr>
						</tbody>
					</table>
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
<script type="text/javascript" src="/js/personal.js"></script>
<?php $this->endBlock();  ?>