// For Alert Handling
document
  .querySelector("#taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const assignedTo = document.querySelector("#assignedTo").value;
    const dueDate = document.querySelector("#dueDate").value;
    const status = document.querySelector("#status").value;

    const errorElement = document.querySelector("#error");
    errorElement.style.display = "none";

    const successElement = document.querySelector("#success");
    successElement.style.display = "none";

    if (!name || !description || !assignedTo || !dueDate || !status) {
      errorElement.textContent = "All fields are required.";
      errorElement.style.display = "block";
      successElement.style.display = "none";
      console.log("Form not valid");
    } else {
      successElement.textContent = "Form submitted succesfully.";
      successElement.style.display = "block";
      errorElement.style.display = "none";
      console.log("Form is valid");
    }
  });

// Function to prevent user from selecting a past date
window.onload = function () {
  var today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").setAttribute("min", today);
};

// For Setting and controlling the number of Columns
(function ($) {
  $(document).ready(function () {
    // Initial column generation
    updateColumns(4);

    // Add column button click event
    $("#add-col").click(function () {
      const colNum = parseInt($("#col-num").val()) + 1;
      updateColumns(colNum);
    });

    // Remove column button click event
    $("#remove-col").click(function () {
      const colNum = parseInt($("#col-num").val()) - 1;
      if (colNum > 8 || colNum < 1) {
        alert(
          "Minimum number of columns is 1, and Maximum number of columns is 8"
        );
      } else {
        updateColumns(colNum);
      }
    });

    // Reorder columns button click event
    $("#reorder-col").click(function () {
      const colIndex = parseInt($("#col-order").val()) - 1; // Get target column index (adjust for 0-based indexing)
      const currentCols = $(".col"); // Get all column elements

      if (colIndex >= 0 && colIndex < currentCols.length) {
        const targetCol = currentCols.eq(colIndex); // Get the target column element
        if (targetCol.prev().length) {
          // Check if not the first column
          targetCol.insertBefore(targetCol.prev()); // Insert before previous column
        } else if (targetCol.next().length) {
          // Check if not the last column
          targetCol.insertAfter(targetCol.next()); // Insert after next column
        } else {
          alert("Cannot reorder first or last column");
        }
      } else {
        alert("Invalid column index");
      }

      $("#col-order").val(""); // Clear the input field after reorder
    });

    // Edit column button click event (using event delegation)
    $("#task-list").on("click", ".edit-btn", function () {
      const col = $(this).parent(); // Get the clicked column element
      const colTitle = col.find("h2").text(); // Get current title
      const colColor = col.css("background-color"); // Get current background color

      // Set values in the edit modal
      $("#col-title").val(colTitle);
      $("#col-color").val(colColor);

      // Show the edit column modal
      $("#editColumnModal").modal("show");
      $(".modal").data("selected-col", col); // Set modal data to store the selected column
    });

    // Save column button click event (assuming this is linked to the `#save-col` button in the modal)
    $("#save-col").click(function () {
      const newTitle = $("#col-title").val();
      const newColor = $("#col-color").val();
      const selectedCol = $(".modal").data("selected-col"); // Get the column to update (using modal data)

      // Update column title and color in the task list
      selectedCol.find("h2").text(newTitle);
      selectedCol.css("background-color", newColor);

      // Hide the edit column modal
      $("#editColumnModal").modal("hide");
    });

    // Color picker button click event (assuming these are linked to the color buttons in the modal)
    $(".color-picker button").click(function () {
      const color = $(this).css("background-color");
      $("#col-color").val(color); // Set the color input value
    });

    // Function to update the number of columns in the task list
    function updateColumns(numColumns) {
      $("#col-num").val(numColumns);
      $("#task-list").empty(); // Clear existing columns
      const defaultNames = ["To Do", "In Progress", "Review", "Done"]; // Define default names
      const defaultColors = ["#ff0000", "#ffff00", "#00ff00", "#0000ff"]; // Define default colors

      for (let i = 0; i < numColumns; i++) {
        const colName = i < 4 ? defaultNames[i] : `Column ${i + 1}`;
        const colColor = i < 4 ? defaultColors[i] : "#ff00ff"; // Use default colors for first 4 columns
        const col = `<div class="col col-reorder mb-3">
        <div class="card">
          <div class="card-header text-center text-auto edit-btn" >
              ${colName}

          <div>
          <button class="btn btn-sm btn-secondary mx-4 my-2 edit-btn">Edit</button>
      </div>
          </div>

          <div class="card-body p-2">
          
            <!-- Task List -->
            <div class="list-group gap-4">
              <div class="list-group-item list-group-item-action">
                <div class="task-card">
                  <h5 class="card-title">Task Name</h5>
                  <p class="card-text">This is a brief description of the task.</p>
                  <ul class="list-unstyled">
                    <li>Assigned To: John Doe</li>
                    <li>Due Date: 2024-06-15</li>
                    <li>Status: ${colName}</li>
                  </ul>
                </div>
              </div>
              <div class="list-group-item list-group-item-action">
                <div class="task-card">
                  <h5 class="card-title">Task Name</h5>
                  <p class="card-text">This is a brief description of the task.</p>
                  <ul class="list-unstyled">
                    <li>Assigned To: John Doe</li>
                    <li>Due Date: 2024-06-15</li>
                    <li>Status: ${colName}</li>
                  </ul>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>`;
        $("#task-list").append(col);
      }
    }
  });
})(jQuery); // jQuery is passed as an argument to the function, ensuring it's available within the code.
