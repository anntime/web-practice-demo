<?php 

Class EvalueAction extends CommonAction{
	/**
	 * 显示评估设置界面的模板
	 */
	Public function index(){
		$this->display();
	}
	/**
	 * 
	 */
	Public function direct(){
		$this->display();
	}
	Public function saveEvalueSetting(){
		/**
		 * 更新设置模拟用户所占百分比
		 */
		$data = array('Val'=>I('SimulatePercent'));
		if(SaveConfig("SimulatePercent",$data)) $this->success('修改成功',U('/Admin/Evalue/index'));
		else $this->error('没有修改数据',U('/Admin/Evalue/index'));
	}
}
 ?>