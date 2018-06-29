<?php 

	Class LoginAction extends Action{

		public function index(){
			/**
			 * 登录界面首页视图函数。
			 */
			$this->display();
		}
		public function login(){
			/**
			 *	用户登录判断用户信息的函数
			 *	1、判断验证码是否正确（这里不区分大小写）。
			 *	2、判断数据是否是POST来的，如果不是提示访问页面不存在。
			 *	3、验证用户名密码，判断用户的状态是否为锁定。
			 *	4、写入Session
			 *	5、重定向到后台主页页面。
			*/
			if(strtolower(I('code'))!=strtolower($_SESSION['verify']))
			$this->error('验证码错误！');
			if(!IS_POST) halt('您访问的页面不存在！','Admin/Login');
			$username = I('username');
			$pwd= md5(I('password'));
			$user= M('user')->where(array('username'=>$username))->find();
			if (!$user||$user['password']!=$pwd){
				$this->error('用户名或密码错误！');
				return;
			}
			if($user['lock']){
				$this->error('该用户被锁定！');
				return;
			}
			//将用户数据写入SESSION
			session('uid',$user['id']);
			session('username',$user['username']);
			session('logintime',date('y-m-d H:i',time()));
			session('loginip',get_client_ip());
			$this->redirect('Admin/Index/index');
		}
		public function verify(){
			/**
			 * 调用验证码类，设置验证码的格式和大小。以及验证码的显示设置。
			 */
			import('ORG.Util.Image');
			Image::buildImageVerify(4,1,'png');
		}
}

 ?>