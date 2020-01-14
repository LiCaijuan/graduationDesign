package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.model.bean.User;
import com.example.demo.model.dao.UserDAO;

@RestController
public class BasicController{
	
	@Autowired
	private UserDAO userDAO;
	
	@GetMapping(value="")
	public String index() {
		return "login";
	}
	
	@GetMapping(value="index.do")
	public ModelAndView index2() {
		return new ModelAndView("login");
	}
	
	@GetMapping(value="login.do")
	public Object login(String name, String password) {
		System.out.println("传入参数：name="+name+",password="+password);
		if(StringUtils.isEmpty(name)) {
			return "name不能为空";
		} else if(StringUtils.isEmpty(password)) {
			return "password不能为空";
		}
		User user = userDAO.find(name,password);
		if(user!=null) {
			return user;
		}else {
			return "用户名或密码错误";
		}
	}
}