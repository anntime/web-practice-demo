<?php 

Class IndexAction extends CommonAction {
	Public function index(){
		/**
		 * 后台首页控制器视图。
		 */
		$this->display();
	}
	Public function logout(){
		/**
		 * 注销用户登录函数。
		 * 销毁Session，并且重定向到登录界面。
		 */
		session_unset();
		session_destroy();
		$this->redirect('Admin/Login/index');
	}
}

 ?>