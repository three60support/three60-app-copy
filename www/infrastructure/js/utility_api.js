const  MODULE_ID_HOMEWORK			=  4;
const  FRONTEND_TYPE_APP			=  "app",				FRONTEND_TYPE_BROWSER		=  "browser";
const  FIELD_SET_BASIC				=  "B",					FIELD_SET_ALL				=  "A";
const  HTML_POST_JSON_DATATYPE		=  "J",					HTML_POST_TEXT_DATATYPE		=  "T";
const  STORAGE_KEY_SERVER_URL								=  "three60.Master.School.ServerUrl",			STORAGE_KEY_LOGIN_TOKEN		=  "three60.Infrastructure.Login.LoginToken";
const  _NOT_LOGGED_IN_RESPONSE								=  "_not_logged_in";
const  _STUDENT_DP_PATH										=  "/data/visible/vs/utility/profile/student/";

function  htmlDisableFieldRange								(class_name_prefix,  start_no,  end_no,  to_disable)	{
	for  (var f = start_no;  f <= end_no;  f++)				{
		$("." + class_name_prefix + f).prop					("disabled", to_disable);
	}
}


function  htmlPopulateSelect								(select_element,  option_arrays,  add_select_option)	{
	htmlPopulateSelect										(select_element, option_arrays, add_select_option, "Select");
}

function  htmlPopulateSelect								(select_element,  option_arrays,  add_select_option,  select_option_text)	{
	select_element.options.length							=  0;
	const  document_fragment								=  document.createDocumentFragment	();
	if  (add_select_option)									{
		const  select_option								=  document.createElement			("option");
		select_option.textContent							=  select_option_text;
		select_option.value									=  "";
		document_fragment.appendChild						(select_option);
	}

	for  (var o = 0, length = option_arrays.length;  o < length;  o++)	{
		const  option										=  document.createElement			("option");
		option.value										=  option_arrays [o][0];
		option.textContent									=  option_arrays [o][1];
		document_fragment.appendChild						(option);
	}
	select_element.appendChild								(document_fragment);
}


function  htmlPost											(url, data, callback, datatype)		{
	var  xhr												=  new XMLHttpRequest();
	xhr.open												("post", url, true);
	xhr.setRequestHeader									("Content-Type", "application/x-www-form-urlencoded");
	xhr.send												(data);
	xhr.onload												=  function ()	{
		var  response										=  (datatype == HTML_POST_JSON_DATATYPE)  ?  JSON.parse(this.responseText)  :  this.responseText;
		callback											(response);
	}
}


function  htmlGetURLParameter (parameter_name)				{
	parameter_name											=  parameter_name.replace (/[\[\]]/g, "\\$&");
	const  reg_exp											=  new RegExp ("[?&]" + parameter_name + "(=([^&#]*)|&|#|$)");
	const  result_array										=  reg_exp.exec (window.location.href);
	if  (!result_array)										{
		return												(null);
	}
	if  (!result_array[2])									{
		return												("");
	}
	return													(decodeURIComponent (result_array[2].replace (/\+/g, " ")));
}


function  rightsIsAuthorised (server_response, frontend_type)	{
	if  ((server_response.constructor === Array)  &&  (server_response.length == 1)  &&  (server_response[0] == _NOT_LOGGED_IN_RESPONSE))	{
		if  (frontend_type  ==  "app")						{
			window.location.href							=  "/login_form_app.html";
		}
		else												{
			alert											("Your login session has expired.\nKindly login in a new tab, then return to this tab and retry this operation.");
		}
		return												(false);
	}
	return													(true);
}

function  studentProfileGetStudentDP						(student_reg_id,  student_dp_file_name)		{
	return													(_STUDENT_DP_PATH + student_reg_id + "/" + student_dp_file_name);
}
