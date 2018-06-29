<?php 

	/**
	 * 系统信息的配置控制器
	 *  Author：Mr.Xiao
	 *	Time：2015年2月14日09:43:17
	 */
	Class SystemAction extends CommonAction{
		Public function index(){
			/**
			 * System控制器首页显示视图。
			 */
			$this->display();
		}
		Public function saveSystemInfo(){
			/**
			 * 用于保存系统的版权信息的修改页面post过来的数据。
			 * 如果对数据库进行了改动，返回修改成功信息。
			 * 如果对未对数据库进行修改，返回数据没有修改。
			 */
			$copy = array('Val'=>I('copyright'));
			$version = array('Val'=>I('version'));
			$copySave = SaveConfig("CopyRight",$copy);
			$verSave = SaveConfig("Version",$version);
			if ($copySave||$verSave) $this->success('修改成功',U('/Admin/System/index'));
			else $this->error('数据没有修改',U('/Admin/System/index'));
		}
		Public function IndexSetting(){
			/**
			 * 在System控制器下展示前台界面所要修改的信息。
			 * 在Common.php文件中创建前台的调用函数，这里只负责显示模板文件。
			 */
			$this->display();
		}
		Public function SaveIndexSetting(){
			/**
			 *	接收IndexSetting页面下POST过来的数据。将数据进行过滤入库操作。
			 * 	如果对数据库进行了改动，返回修改成功信息。
			 * 	如果对未对数据库进行修改，返回数据没有修改。
			 */
			dump($_POST);
		}
	}
 ?>