  
 
  // Mark as Complete or NOT complete

  const handleComplete = async (id) => {
    const response = await fetch(fetchPath + id, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    console.log(json.completed);

    if (json.completed === "NO") {
      console.log("NO was not Completed  change to completed");

      const completed = "YES";
      const change = { completed };
      console.log(change);

      ////////////////////////// NOT Patch completed change
      const res = await fetch(fetchPath + id, {
        method: "PATCH",
        body: JSON.stringify(change),
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const results = await res.json();
      console.log(results);

      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        console.log("change made");
        window.location.reload(false);
      }
    }
    if (json.completed === "YES") {
      console.log("YES is completed change to NOT");

      const completed = "NO";
      const change = { completed };
      console.log(change);

      ///////////////////////////////////// IS Patch paid change
      const res = await fetch(fetchPath + id, {
        method: "PATCH",
        body: JSON.stringify(change),
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const results = await res.json();
      console.log(results);

      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        console.log("change made");
        window.location.reload(false);
      }
    }
  };

