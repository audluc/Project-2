$(document).ready(function () {
  $("#irs-form").hide()
  $("#dmv-form").hide()
  $.get("/api/member").then(function (data) {
    console.log(data)
    let dropDownData = $("#client")
    $.each(data.data, function () {
      dropDownData.append($("<option />").val(this.id).text(this.name));
    });
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  $("#create-client").click(function () {
    let clientName = $(".client-name").val()
    $.post("/api/member", { name: clientName }).then(function (data) {
      $.get("/api/member").then(function (data) {
        console.log(data)
        let dropDownData = $("#client")
        $.each(data.data, function () {
          dropDownData.append($("<option />").val(this.id).text(this.name));
        });
      });
    });
  });

  $("#save-button").click(function () {
    $.post("/api/saveMember", {
      name: $("#fname").val(),
      m_initial: $("#mname").val(),
      last_name: $("#lname").val(),
      ss_number: $("#ssn").val(),
      d_o_b: $("#dob").val(),
      spouse_first_name: $("#Sfname").val(),
      spouse_middle_initial: $("#smname").val(),
      spouse_last_name: $("#Slname").val(),
      spouse_ss_number: $("#spousessn").val(),
      spouse_d_o_b: $("#sdob").val(),
      address_one: $("#addressOne").val(),
      address_two: $("#addressTwo").val(),
      apartment_number: $("#addressThree").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      zip: $("#zipCode").val(),
      foreign_country_name: $("#foreignCountryName").val(),
      foreign_province_state: $("#foreignProvinceState").val(),
      foreign_postal_code: $("#foreignPostalCode").val(),
      phone_number: $("#phone").val(),
      email: $("#email").val()
    })
    var formtype = $("#country option:selected").val()
    console.log(formtype)
    if (formtype == "DMV") {

      reg334();

    } else if (formtype == "f1040") {

      irs1040();

    }
   
  });

  $("#client").change(function () {
    var id = $(this).val();
    console.log(id);
    $.get("/api/member/" + id).then(function (data) {
      console.log(data);
      $("#fname").val(data.data.name);
      $("#mname").val(data.data.m_initial);
      $("#lname").val(data.data.last_name);
      $("#ssn").val(data.data.ss_number);
      $("#dob").val(data.data.d_o_b);
      $("#Sfname").val(data.data.spouse_first_name);
      $("#smname").val(data.data.spouse_middle_initial);
      $("#Slname").val(data.data.spouse_last_name);
      $("#spousessn").val(data.data.spouse_ss_number);
      $("#sdob").val(data.data.spouse_d_o_b);
      $("#addressOne").val(data.data.address_one);
      $("#addressTwo").val(data.data.address_two);
      $("#addressThree").val(data.data.apartment_number);
      $("#city").val(data.data.city);
      $("#state").val(data.data.state);
      $("#zipCode").val(data.data.zip);
      $("#foreignCountryName").val(data.data.foreign_country_name);
      $("#foreignProvinceState").val(data.data.foreign_province_state);
      $("#foreignPostalCode").val(data.data.foreign_postal_code);
      $("#phone").val(data.data.phone_number);
      $("#email").val(data.data.email);

    });
  })
});

$("#submit-btn").click(function () {
  var formtype = $("#country option:selected").val()
  console.log(formtype)
  if (formtype == "DMV") {
    // $("#dmv-form").show()
    $("#dmv-form").show()



  } else if (formtype == "f1040") {
    $("#irs-form").show()
    // $("#dmv-form").hide()

  }
});



function reg334() {
  var doc = new jsPDF("p", "pt", "letter");

  doc.addImage(imgData, 'JPEG', -17, -25, 650, 830);

  doc.text(10, 140, name);
  doc.text(160, 140, mname);
  doc.text(260, 140, lname);
  doc.text(400, 140, ssn);
  doc.text(30, 350, dob);
  doc.text(30, 439, Sfname);
  doc.text(30, 465, smname);
  doc.text(30, 490, Slname);
  doc.text(30, 517, spousessn);
  doc.text(30, 541, addressOne);
  doc.text(30, 610, addressTwo);
  // doc.text(23,566, addressThree);
  // doc.text(23,577, city  );
  // doc.text(23,588, state  );
  // doc.text(23,599, zipCode  );
  doc.text(30, 633, foreignCountryName);
  doc.text(30, 659, foreignProvinceState);
  doc.text(30, 685, foreignPostalCode);

  doc.setFontSize(11);
  doc.setTextColor(92, 76, 76);

  doc.text(23, 109, name);
  doc.text(150, 109, mname);
  doc.text(235, 109, lname);
  doc.text(490, 109, ssn);
  doc.text(23, 501, dob);
  doc.text(23, 134, Sfname);
  doc.text(150, 134, smname);
  doc.text(235, 134, Slname);
  doc.text(490, 134, spousessn);
  doc.text(23, 160, addressOne);
  doc.text(23, 185, addressTwo);
  // doc.text(23,566, addressThree  );
  // doc.text(23,577, city  );
  // doc.text(23,588, state  );
  // doc.text(23,599, zipCode  );
  doc.text(23, 210, foreignCountryName);
  doc.text(250, 210, foreignProvinceState);
  doc.text(407, 210, foreignPostalCode);
  // doc.text(23,643, phone  );
  // doc.text(23,644, email  );

  var checkBox = new CheckBox();
  checkBox.fieldName = "CheckBox1";
  checkBox.Rect = [50, 20, 10, 10];
  checkBox.value = 'Yes'
  doc.addField(checkBox)

  doc.save('test.pdf');
}


function irs1040() {
  var doc = new jsPDF("p", "pt", "letter");


  doc.addImage(imgData, 'JPEG', -25, -25, 660, 830);

  var name = $('#fname').val();
  var mname = $('#mname').val();
  var lname = $('#lname').val();
  var ssn = $('#ssn').val();
  var dob = $('#dob').val();
  var Sfname = $('#Sfname').val();
  var smname = $('#smname').val();
  var Slname = $('#Slname').val();
  var spousessn = $('#spousessn').val();
  var addressOne = $('#addressOne').val();
  var addressTwo = $('#addressTwo').val();
  // var addressThree   = $('#addressThree').val();
  // var city  = $('#city').val();
  // var state = $('#state').val();
  // var zipCode = $('#zipCode').val();
  var foreignCountryName = $('#foreignCountryName').val();
  var foreignProvinceState = $('#foreignProvinceState').val();
  var foreignPostalCode = $('#foreignPostalCode').val();
  // var phone   = $('#phone').val();
  // var email   = $('#email').val();

  doc.setFontSize(11);
  doc.setTextColor(92, 76, 76);

  doc.text(23, 109, name);
  doc.text(150, 109, mname);
  doc.text(235, 109, lname);
  doc.text(490, 109, ssn);
  doc.text(23, 501, dob);
  doc.text(23, 134, Sfname);
  doc.text(150, 134, smname);
  doc.text(235, 134, Slname);
  doc.text(490, 134, spousessn);
  doc.text(23, 160, addressOne);
  doc.text(23, 185, addressTwo);
  // doc.text(23,566, addressThree  );
  // doc.text(23,577, city  );
  // doc.text(23,588, state  );
  // doc.text(23,599, zipCode  );
  doc.text(23, 210, foreignCountryName);
  doc.text(250, 210, foreignProvinceState);
  doc.text(407, 210, foreignPostalCode);
  // doc.text(23,643, phone  );
  // doc.text(23,644, email  );

  var checkBox = new CheckBox();
  checkBox.fieldName = "CheckBox1";
  checkBox.Rect = [50, 20, 10, 10];
  checkBox.value = 'Yes'
  doc.addField(checkBox)

  doc.save('test.pdf');
}