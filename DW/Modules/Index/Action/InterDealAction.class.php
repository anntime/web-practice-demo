<?php 
Class InterDealAction extends Action{
	/**
	 * 交互控制器，主要负责处理前台传递过来的数据。对交互数据进行模拟。
	 * 模拟的主要过程为：
	 * 	 ①.初始化用户数据=>读取SimulateNum，读取相应个数的用户信息。
	 * 	 ②.将初始化临时数据入库
	 *   ③.接受前台传来的交互数据(用户ID和请求资源ID)
	 *   ④.进行信任评估
	 *   ⑤.将交互评估数据正式写入数据库
	 *	 ⑥.将处理数据返回前台进行显示
	 */
	Public function index(){
		$this->display();
	}

	/**
	 * 对应①.初始化用户数据
	 * InitSimulate()用于初始化模拟数据，包括模拟用户数和模拟用户的ID.
	 * 模拟用户的ID根据SimulateNum来随机产生。 
	 */
	Public function InitSimulate(){
		//$SimulateNum = getSimulateNum();
		//获取用户数量
		$userNum = user_count();
		//获取需要模拟的用户数量：$simulateNum
		$simulateNum = getSimulateNum();
		/**
		 * 产生随机数：
		 * ①.根据用户总量$userNum，产生1--$userNum个的顺序序列。
		 * ②.将顺序序列进行随机重组
		 * ③.截取随机序列中的其中长度为$simulateNum的随机数
		 */
		$nums = range(1,$userNum);
		shuffle($nums);   //将顺序序列进行随机重组
		$randomId = array_slice($nums,0,$simulateNum);
		$simulateUserInfo["userInfo"] = $this->getInfoByRandomID($randomId);
		$simulateUserInfo["timeline"] = $this->getTimeLine();
 		$this->SaveTempInfo($simulateUserInfo);
		 //dump($simulateUserInfo);
		$this->ajaxReturn($simulateUserInfo,'json');
	}

	/**
	 * 对应②.将初始化临时数据入库
	 * 每次写入之前执行清空数据库操作。
	 * 
	 */
	Public function SaveTempInfo($data){
		$db = M('temp');
		$db->where('1')->delete();
		$db->query('alter table os_temp AUTO_INCREMENT=1;');
		$datauser = $data["userInfo"];
		//dump($datauser);
		$data_save=array();
		foreach($datauser as $key=>$val){
			$t = $val['userId'];
			if ($t==$id) {
				$val['remark'] = $request;
			}
			$val['userId'] = $t;
			unset($val['id']);
			unset($val['visittime']);
			unset($val['password']);
			M('temp')->data($val)->add();
		}
		$count_temp=M('temp')->count();
		if($count_temp!=getConfig('SIMULATE_NUM')) return 0;
		else return 1;
	}

	/**
	 * 获取前台触发的访问用户和请求的资源
	 * 将信息存入Temp表中，其中remark存放访问权限
	 * 调用信用评估模块
	 */
	Public function DealRequest(){
		$id = I('id');
		$request = I('request');
		$RequestInfo = array("id"=>$id,"request"=>$request);
		//过滤请求参数不完整的情况！
		if ($id==''||$request=='') 
			$this->error('请求数据不完整，请重新操作！',U('/Index/InterDeal/index'));
		// 调用函数，将数据进行ajax返回！
		$this->getInterReturn($RequestInfo);
	}
	/**
	 * 调用评估函数
	 * 1、调用间接评估模块：
	 *	  ①、得到间接访问评判的用户信息：getIndirectUser
	 *	  ②、
	 * 
	 */
	Public function CallEvaluate($request){
		// dump($IndirectUserInfo);
	}









	/**
	 * getInfoByRandomID()根据产生的随机ID，获取用户的信息。
	 * ①.select出所有用户数据。
	 * ②.用嵌套循环获取相应userID的用户信息。
	 * ③.以数组形式返回用户数据。
	 */
	Public function getInfoByRandomID($randomId){
		$user_all = M('user')->field("id as userId,username,ip,province,city,longitude,latitude")->select();
		$simulateInfo = array();
		foreach($user_all as $key=>$user){
			foreach($randomId as $k=>$v){
				if($user['userId']==$v) $simulateInfo[] = $user;
				else continue;
			}
		}
		return $simulateInfo;
	}

	/**
	 * 根据模拟用户信息、间接信任所占比例和发起请求用户，返回评估和非评估用户信息。
	 * ①.获取Temp表信息
	 * ②.产生间接访问随机数
	 * ③.嵌套循环获取随机数对应的ID用户信息到IndirectUserInfo数组中。
	 * ④.对比找出不参加间接评估的用户
	 * ⑤.重新组成数组
	 * ⑥.将交互数据存储到interdetail表中(正式存储交互信息)
	 * ⑦.返回请求！
	 */
	Public function getInterReturn($RequestInfo){
		$RequestUserId = $RequestInfo["id"];
		//获取所有Temp表的信息
		$con['userId'] = array('neq',$RequestUserId);  //选出
		$simulateUserInfo = M('temp')->where($con)->select();
		//dump($simulateUserInfo);
		//获取间接用户个数四舍五入(根据simulNum和SimulatePercent)
		$IndirectNum = getIndirectNum();
		$nums = range(0,count($simulateUserInfo)-1);
		shuffle($nums);   //将顺序序列进行随机重组
		$randomId = array_slice($nums,0,$IndirectNum);
		//dump($randomId);

		$IndirectUserInfo = array();
		foreach ($simulateUserInfo as $key => $val) {
			foreach ($randomId as $k=>$v){
				if($key == $v) {
					$IndirectUserInfo[] = $val;
					unset($simulateUserInfo[$key]);
				}
			}
		}
		//OtherUserInfo用于存放直接用户
		$OtherUserInfo = array();
		foreach ($simulateUserInfo as $key => $value) {
			$OtherUserInfo[] = $value;
		}
		//调用评估类
		import('Class.Evaluate',APP_PATH);
		$IndirectUserInfo = Evaluate::IndirectEvaluate($IndirectUserInfo);
		$IndirectAndDirect = array();
		$IndirectAndDirect["IndirectUser"] = $IndirectUserInfo;
		$IndirectAndDirect["DirectUser"] = $OtherUserInfo;
		//判断用户是否获取访问权限(******预留待写******)。
		//dump($IndirectAndDirect);
		// 在返回之前将交互数据正式存储在interdetail表中
		$this->SaveInterAction($RequestInfo,$IndirectAndDirect);
		//返回Ajax请求
		$this->ajaxReturn($IndirectAndDirect,'json');
	}


	/**
	 * 存储交互日志信息！！
	 * 将交互日志存储到os_interdetail表中
	 */
	Public function SaveInterAction($RequestInfo,$SaveData){
		$data = array();
		// dump($SaveData);
		$IndirectUserInfo = $SaveData["IndirectUser"];
		$DirectUserInfo = $SaveData["DirectUser"];
		// dump($IndirectUserInfo);
		// echo "********************************";
		// dump($DirectUserInfo);


		//构建入库字符串！
		foreach ($IndirectUserInfo as $key => $value) {
			$IndirectString = $IndirectString.$value["userId"].":".$value["IndirectScore"].";";
		}
		$data["IndirectUser"] = substr($IndirectString, 0, -1);
		foreach ($DirectUserInfo as $key => $value) {
			$DirectString = $DirectString.$value["userId"].":0;";
		}
		$data["DirectUser"] = substr($DirectString,0,-1);
		$data["time"] = time();
		$data["userId"] = $RequestInfo["id"];
		$data["request"] = $RequestInfo["request"];
		//获取交互次数，如果没有交互过，则返回0，如果不为0，则为交互次数。
		$data["times"] = $this->getInterTimes($RequestInfo["id"]);
		import('Class.Evaluate',APP_PATH);
		$data["totalScore"] =  Evaluate::getTotalScore($userId);
		import("Class.RoleMap",APP_PATH);
		$data["isPass"] = RoleMap::isPass($RequestInfo,$SaveData,$data["totalScore"]);
		M("interdetail")->add($data);
	}


	/*
	*根据用户ID返回用户信息
	*/
	Public function getInfoById(){
		$id = I('id');
		$info=getInfById($id);
		if(empty($info)) $this->ajaxReturn(array('status'=>0),'json');
		else $this->ajaxReturn($info,'json');
	}
	/**
	 * 传入用户ID，判断，该ID请求访问的次数，如果是空，返回1，如果非空返回times+1
	 */
	Public function getInterTimes($id){
		$times = M("interdetail")->where("userId=".$id)->max("times");
		if($times=="") return 1;
		else return $times+1;

	}
	/**
	 * 用于获取填充时间轴的数据，获取最近8次交互的userId和请求资源类型
	 */
	Public function getTimeLine(){
		$limit=7;
		$info = M("interdetail")->order("time desc")->limit($limit)->select();
		$timeline = array();
		foreach ($info as $key => $value) {
			$timeline[]=array("userId"=>$value["userId"],"request"=>$value["request"],"time"=>$value["time"]);
		}
		$temp = $timeline;
		foreach ($timeline as $key => $value) {
			$timeline[$key] = $temp[$limit-1];
			$limit = $limit-1;
		}
		//dump($timeline);
		return $timeline;
	}
	/**
	 * 根据请求ID返回该ID最近一次请求的数据
	 * 前台点击时间轴上的点，返回交互信息。
	 */
	Public function getStartTimeline(){
		$id = I("id");
		$time = I("time");
		import("Class.History",APP_PATH);
		$info = History::getLastVisitById($id,$time);
		//dump($info);
		 $this->ajaxReturn($info,"json");
	}
}
?>