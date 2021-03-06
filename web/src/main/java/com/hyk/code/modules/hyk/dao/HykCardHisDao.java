/**
 * Copyright &copy; 2012-2016 <a href="http://www.uddd.com/">油大大</a> All rights reserved.
 */
package com.hyk.code.modules.hyk.dao;

import com.hyk.code.common.persistence.CrudDao;
import com.hyk.code.common.persistence.annotation.MyBatisDao;
import com.hyk.code.modules.hyk.entity.HykCardHis;

import java.util.List;
import java.util.Map;

/**
 * 充值卡兑换记录DAO接口
 * @author 霍中曦
 * @version 2018-12-18
 */
@MyBatisDao
public interface HykCardHisDao extends CrudDao<HykCardHis> {

    Map getCountMoneyAndCount(String userId);//查询该用户的充值卡兑换总金额次数

    List<HykCardHis> getListByUserId(String userId);//用户充值记录
}