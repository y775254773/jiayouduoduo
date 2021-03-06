package com.hyk.code.common.wxpay;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.math.BigDecimal;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

/**
 * @Auther: 霍中曦
 * @Date: 2019/1/15 11:04
 * @Description:
 */
public class PayUtil {
    //微信参数配置
    public static String API_KEY = "";
    public static String APPID = "";
    public static String MCH_ID = "";
    public static String OIL_NOTIFY = "/f/web/pay/receiveNotifyWxPay";//加油卡正式回调地址

    /**
     * 微信H5支付
     *
     * @param request -
     * @return -
     */
    public static SortedMap<String, Object> wxPay(WxModel wxModel, HttpServletRequest request) {
        Map<String, String> map = weixinPrePay(wxModel, request);
        SortedMap<String, Object> finalpackage = new TreeMap<>();
        finalpackage.put("appid", PayUtil.APPID);
        finalpackage.put("partnerid", PayUtil.MCH_ID);
        finalpackage.put("prepayid", map.get("prepay_id"));
        finalpackage.put("package", "Sign=WXPay");
        finalpackage.put("noncestr", getRandomString(32));
        finalpackage.put("timestamp", Math.round(System.currentTimeMillis() / 1000) + "");
        String sign = PayUtil.createSign(finalpackage);
        finalpackage.put("sign", sign);
        return finalpackage;
    }

    /**
     * 微信字段排序
     *
     * @param request -
     * @return -
     */
    private static Map<String, String> weixinPrePay(WxModel wxModel, HttpServletRequest request) {
        SortedMap<String, Object> parameterMap = new TreeMap<>();
        parameterMap.put("appid", PayUtil.APPID);
        parameterMap.put("mch_id", PayUtil.MCH_ID);
        parameterMap.put("nonce_str", getRandomString(32));
        parameterMap.put("body", wxModel.getBody());
        parameterMap.put("attach", wxModel.getAttach());
        parameterMap.put("out_trade_no", wxModel.getOut_trade_no());
        BigDecimal total = wxModel.getTotalAmount().multiply(new BigDecimal(100));
        java.text.DecimalFormat df = new java.text.DecimalFormat("0");
        parameterMap.put("total_fee", df.format(total));
        parameterMap.put("spbill_create_ip", request.getRemoteAddr());
        parameterMap.put("time_start", wxModel.getTime_start());
        parameterMap.put("time_expire", wxModel.getTime_expire());

         parameterMap.put("notify_url", OIL_NOTIFY);

        parameterMap.put("trade_type", "APP");
        parameterMap.put("sign_type", "MD5");
        String sign = PayUtil.createSign(parameterMap);
        parameterMap.put("sign", sign);

        String requestXML = PayUtil.getRequestXml(parameterMap);
        String result = PayUtil.httpsRequest("https://api.mch.weixin.qq.com/pay/unifiedorder", "POST", requestXML);
        System.out.println(result);
        Map<String, String> map = null;
        try {
            map = PayUtil.doXMLParse(result);
        } catch (JDOMException | IOException e) {
            e.printStackTrace();
        }
        return map;
    }

    //随机字符串生成
    private static String getRandomString(int length) { //length表示生成字符串的长度
        String base = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(base.length());
            sb.append(base.charAt(number));
        }
        return sb.toString();
    }

    //请求xml组装
    private static String getRequestXml(SortedMap<String, Object> parameters) {
        StringBuilder sb = new StringBuilder();
        sb.append("<xml>");
        Set es = parameters.entrySet();
        for (Object e : es) {
            Map.Entry entry = (Map.Entry) e;
            String key = (String) entry.getKey();
            String value = (String) entry.getValue();
            if ("attach".equalsIgnoreCase(key) || "body".equalsIgnoreCase(key) || "sign".equalsIgnoreCase(key)) {
                sb.append("<").append(key).append(">").append("<![CDATA[").append(value).append("]]></").append(key).append(">");
            } else {
                sb.append("<").append(key).append(">").append(value).append("</").append(key).append(">");
            }
        }
        sb.append("</xml>");
        return sb.toString();
    }

    //生成签名
    private static String createSign(SortedMap<String, Object> parameters) {
        StringBuilder sb = new StringBuilder();
        Set es = parameters.entrySet();
        for (Object e : es) {
            Map.Entry entry = (Map.Entry) e;
            String k = (String) entry.getKey();
            Object v = entry.getValue();
            if (null != v && !"".equals(v)
                    && !"sign".equals(k) && !"key".equals(k)) {
                sb.append(k).append("=").append(v).append("&");
            }
        }
        sb.append("key=").append(API_KEY);
        System.out.println(sb.toString());
        return Md5Util.MD5Encode(sb.toString(), "UTF-8").toUpperCase();
    }

    /**
     * 验证回调签名
     *
     * @param map
     * @return
     */
    public static boolean isTenpaySign(Map<String, String> map) {
        String charset = "utf-8";
        String signFromAPIResponse = map.get("sign");
        if (signFromAPIResponse == null || signFromAPIResponse.equals("")) {
            System.out.println("API返回的数据签名数据不存在，有可能被第三方篡改!!!");
            return false;
        }
        System.out.println("服务器回包里面的签名是:" + signFromAPIResponse);
        //过滤空 设置 TreeMap
        SortedMap<String, String> packageParams = new TreeMap<>();
        for (String parameter : map.keySet()) {
            String parameterValue = map.get(parameter);
            String v = "";
            if (null != parameterValue) {
                v = parameterValue.trim();
            }
            packageParams.put(parameter, v);
        }
        StringBuilder sb = new StringBuilder();
        Set es = packageParams.entrySet();
        for (Object e : es) {
            Map.Entry entry = (Map.Entry) e;
            String k = (String) entry.getKey();
            String v = (String) entry.getValue();
            if (!"sign".equals(k) && null != v && !"".equals(v)) {
                sb.append(k).append("=").append(v).append("&");
            }
        }
        sb.append("key=").append(API_KEY);
        //将API返回的数据根据用签名算法进行计算新的签名，用来跟API返回的签名进行比较
        //算出签名
        String tobesign = sb.toString();
        String resultSign = Md5Util.MD5Encode(tobesign, "utf-8").toUpperCase();
        String tenpaySign = packageParams.get("sign").toUpperCase();
        return tenpaySign.equals(resultSign);
    }

    //请求方法
    private static String httpsRequest(String requestUrl, String requestMethod, String outputStr) {
        try {
            URL url = new URL(requestUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);
            // 设置请求方式（GET/POST）
            conn.setRequestMethod(requestMethod);
            conn.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            // 当outputStr不为null时向输出流写数据
            if (null != outputStr) {
                OutputStream outputStream = conn.getOutputStream();
                // 注意编码格式
                outputStream.write(outputStr.getBytes("UTF-8"));
                outputStream.close();
            }
            // 从输入流读取返回内容
            InputStream inputStream = conn.getInputStream();
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            String str = null;
            StringBuilder buffer = new StringBuilder();
            while ((str = bufferedReader.readLine()) != null) {
                buffer.append(str);
            }
            // 释放资源
            bufferedReader.close();
            inputStreamReader.close();
            inputStream.close();
            conn.disconnect();
            return buffer.toString();
        } catch (ConnectException ce) {
            System.out.println("连接超时：{}" + ce);
        } catch (Exception e) {
            System.out.println("https请求异常：{}" + e);
        }
        return null;
    }


    //xml解析
    public static Map doXMLParse(String strxml) throws JDOMException, IOException {
        strxml = strxml.replaceFirst("encoding=\".*\"", "encoding=\"UTF-8\"");
        if (null == strxml || "".equals(strxml)) {
            return null;
        }

        Map m = new HashMap();
        InputStream in = new ByteArrayInputStream(strxml.getBytes("UTF-8"));
        SAXBuilder builder = new SAXBuilder();
        Document doc = builder.build(in);
        Element root = doc.getRootElement();
        List list = root.getChildren();
        for (Object aList : list) {
            Element e = (Element) aList;
            String k = e.getName();
            String v = "";
            List children = e.getChildren();
            if (children.isEmpty()) {
                v = e.getTextNormalize();
            } else {
                v = getChildrenText(children);
            }
            m.put(k, v);
        }
        //关闭流
        in.close();
        return m;
    }

    private static String getChildrenText(List children) {
        StringBuilder sb = new StringBuilder();
        if (!children.isEmpty()) {
            for (Object aChildren : children) {
                Element e = (Element) aChildren;
                String name = e.getName();
                String value = e.getTextNormalize();
                List list = e.getChildren();
                sb.append("<").append(name).append(">");
                if (!list.isEmpty()) {
                    sb.append(getChildrenText(list));
                }
                sb.append(value);
                sb.append("</").append(name).append(">");
            }
        }

        return sb.toString();
    }
}