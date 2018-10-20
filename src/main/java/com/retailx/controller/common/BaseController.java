package com.retailx.controller.common;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.retailx.common.BaseObject;

public class BaseController<T extends BaseObject> {

	private final static GsonBuilder gsonBuilder = new GsonBuilder();
	
	protected Gson getGson() {
		final Gson gson = gsonBuilder.enableComplexMapKeySerialization().serializeNulls().create();
		return gson;
	}

	protected Object convertFromJson(final Class<T> clazz, final String data) {
		final Gson gson = getGson();
		final Object object = gson.fromJson(data, clazz);
		return object;
	}	
	
	protected String convertToJson(Object object){
		final Gson gson = getGson();
		final String jsonizedString = gson.toJson(object);
		return jsonizedString;
		
	}
}
