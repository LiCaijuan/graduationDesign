package com.example.demo.entity;

public class Response {
    Boolean isSuc = true;
    String msg;
    int code;
    Object result;

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public void setResponse(Boolean isSuc, String msg, int code, Object result) {
        this.isSuc = isSuc;
        this.msg = msg;
        this.code = code;
        this.result = result;
    }

    public Response() {
    }

    public Response(Boolean isSuc, String msg, int code) {
        this.isSuc = isSuc;
        this.msg = msg;
        this.code = code;
    }

    public Boolean getSuc() {
        return isSuc;
    }

    public void setSuc(Boolean suc) {
        isSuc = suc;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
