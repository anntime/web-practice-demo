<?php 
Class CommonAction extends Action{
	/**
	 * 此控制器为公用控制器，访问每个控制器之前都要执行Common控制器的_函数
	 */
		public function _initialize(){
			/**
			 * 通过Session判断用户是否已经登录系统。
			 * 如果没有登录系统，重定向到登录界面。
			 */
			if(!isset($_SESSION['uid'])||!isset($_SESSION['username'])){
				$this->redirect('Admin/Login/index');
			}
		}

}
 ?>