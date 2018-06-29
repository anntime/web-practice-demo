<?php 
Class MsgManageAction extends CommonAction{

	public function index(){
		import('ORG.Util.Page');
		$count = M('wish')->count();
		$page = new Page($count,10);
		$limit = $page->firstRow.','.$page->listRows;
		$wish = M('wish')->order('time DESC')->limit($limit)->select();
		$this->assign('wish',$wish);
		$this->assign('page',$page->show());
		$this->display();
	}
	public function delete(){
		$id = I('id');
		$ret=M('wish')->where(array('id'=>$id))->delete();
		if($ret){
			$this->success('删除成功',U('Admin/MsgManage/index'));
		}
		else{
			$this->error('删除失败');
		}
	}
}
 ?>
