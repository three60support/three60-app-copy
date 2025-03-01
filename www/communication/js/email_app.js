{
	const  serverUrl										=  localStorage.getItem (STORAGE_KEY_SERVER_URL);
	const  loginToken										=  localStorage.getItem (STORAGE_KEY_LOGIN_TOKEN);

	$(".datepicker").datepicker								({
		format												:  "dd-mm-yyyy",
		autoclose											:  true,
		endDate												:  "+0d"
	});
	$("#from_date").on ("changeDate", function (selected)	{
		$("#to_date").datepicker							("setStartDate", new Date (selected.date.valueOf()));
	});
	$("#to_date").on ("changeDate", function (selected)		{
		$("#from_date").datepicker							("setEndDate", new Date (selected.date.valueOf()));
	});

	const  emailDataTable									=  new DataTable ("#email_table", {
		columns												:  [
			{	visible										:  false		},
			{	title										:  "Subject"	},
			{	title										:  "Sent on"	},
			{	title										:  "Read on"	},
			{	title										:  "View",
				defaultContent								:  "<a href='#'> <img src='/infrastructure/img/view_icon.png' height='17px' class='view_email'> </a>"	}
		],
		info												:  false,
		paging												:  false,
		searching											:  false,
		ordering											:  false
	});

	get_email_button.addEventListener						("click", function (event)	{
		event.preventDefault								();
		_getEmails											();
	});
	_getEmails												();

	email_tbody.addEventListener							("click", function (event)	{
		const  event_target									=  event.target;
		if  (event_target)									{
			if  (event_target.className  ==  "view_email")	{
				_viewEmail									(event_target);
			}
		}
	});


	function  _getEmails ()									{
		$.get												(serverUrl + "/servlets/three60.Communication.Email.GetEmailArrays", $("#get_email_form").serialize() + "&login_token=" +loginToken,
			function (email_arrays)							{
				emailDataTable.clear().rows.add				(email_arrays).draw();
			},  "json"
		);
	}


	function  _viewEmail (event_target)						{
		const  email_row_data								=  emailDataTable.row ($(event_target).parents("tr")).data();
		$.get												(serverUrl + "/servlets/three60.Communication.Email.GetEmailArrays", "mail_id=" + email_row_data[0] + "&login_token=" + loginToken,
			function  (email_array)							{
				email_subject_div.textContent				=  email_row_data[1];
				creation_time_div.textContent				=  email_row_data[2];
				body_div.innerHTML							=  email_array[0];
				$("#email_modal").modal						("show");
			},  "json"
		);
	}
}
