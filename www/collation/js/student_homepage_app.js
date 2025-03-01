document.addEventListener ("DOMContentLoaded", function ()	{
	const  serverUrl										=  localStorage.getItem (STORAGE_KEY_SERVER_URL);
	const  loginToken										=  localStorage.getItem (STORAGE_KEY_LOGIN_TOKEN);
	htmlPost												(serverUrl + "/servlets/three60.Administration.StudentProfile.GetStudentArray",
		("login_token=" + loginToken + "&field_set=" + FIELD_SET_BASIC),
		function  (student_array)							{
			const  student_photo_array						=  document.getElementsByClassName ("student_photo");
			const  student_dp_src							=  serverUrl + studentProfileGetStudentDP (student_array[0], student_array[4]);
			for  (var d = 0, length = student_photo_array.length;  d < length;  d++)	{
				student_photo_array[d].src					=  student_dp_src;
			}
			const  student_name_array						=  document.getElementsByClassName ("student_name");
			for  (var n = 0, length = student_name_array.length;  n < length;  n++)	{
				student_name_array[n].textContent			=  student_array[2];
			}
		},  HTML_POST_JSON_DATATYPE
	);

	htmlPost												(serverUrl + "/servlets/three60.Collation.MainMenu.GetMainMenuArrays", "login_token=" + loginToken + "&frontend_type=app",
		_showMainMenu, HTML_POST_JSON_DATATYPE);

	/*change_password.addEventListener ("click", function ()	{
	});*/
	$("#main_frame").load									("/collation/student_dashboard_app.html");


	function  _showMainMenu (main_menu_arrays)				{
		const		fragment								=  document.createDocumentFragment();
		for  (var m = 0, length = main_menu_arrays.length;  m < length;  m++)	{
			const	main_menu_array							=  main_menu_arrays[m];
			const	li										=  document.createElement ("li");
			const	a										=  document.createElement ("a");
			a.url											=  main_menu_array [2];
			const	i										=  document.createElement ("i");
			i.classList.add									(...main_menu_array[1].split(" "));
			a.appendChild									(i);
			const	a_text									=  document.createTextNode (main_menu_array[0]);
			a.appendChild									(a_text);
			a.addEventListener								("click", _onMainMenuClick);
			li.appendChild									(a);
			fragment.appendChild							(li);
		}
		main_menu_ul.appendChild							(fragment);
	}

	function  _onMainMenuClick ()							{
		$("#main_frame").load								(this.url);
		if  (window.matchMedia ("(pointer: coarse)").matches)	{
			menu_toggle.click								();
		}
	}
});

document.addEventListener ("deviceready", function ()		{
	window.open												=  cordova.InAppBrowser.open;
});
