/**
 * Copyright &copy; 2012-2016 <a href="http://www.uddd.com/">油大大</a> All rights reserved.
 */
package com.hyk.code.modules.gen.dao;

import com.hyk.code.common.persistence.CrudDao;
import com.hyk.code.common.persistence.annotation.MyBatisDao;
import com.hyk.code.modules.gen.entity.GenTable;

/**
 * 业务表DAO接口
 * @author wyw
 * @version 2013-10-15
 */
@MyBatisDao
public interface GenTableDao extends CrudDao<GenTable> {
	
}
