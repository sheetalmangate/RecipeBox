interface NutritionDataProps {
  data: any;
}

const NutritionShowData = ({ data }: NutritionDataProps) => {
  return (
    <div className="nutrition-data text-center text-info-emphasis">
      <h4>Nutrition Information per serving</h4>
      {/* <ul className="list-group">
        {Object.keys(data).map((key) => (
          <li
            key={key}
            className="list-group-item"
            style={{ backgroundColor: "#FFFACD" }}
          >
            <strong>{key}:</strong> {data[key]}
          </li>
        ))}
      </ul> */}
      <ul className="list-group">
        <li className="list-group-item" style={{ backgroundColor: "#FFFACD" }}>
          <strong>calories:</strong>{" "}
          {(data.calories / data.servings).toFixed(1)}
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#FFFACD" }}>
          <strong>fat:</strong> {(data.fat / data.servings).toFixed(1)}g
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#FFFACD" }}>
          <strong>carbohydrates:</strong>{" "}
          {(data.carbohydrates / data.servings).toFixed(1)}g
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#FFFACD" }}>
          <strong>fiber:</strong> {(data.fiber / data.servings).toFixed(1)}g
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#FFFACD" }}>
          <strong>sugar:</strong> {(data.sugar / data.servings).toFixed(1)}g
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#FFFACD" }}>
          <strong>protein:</strong> {(data.protein / data.servings).toFixed(1)}g
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#FFFACD" }}>
          <strong>cholesterol:</strong>{" "}
          {(data.cholesterol / data.servings).toFixed(1)}mg
        </li>
        {data.dietlabels.length > 0 && (
          <li
            className="list-group-item"
            style={{ backgroundColor: "#FFFACD" }}
          >
            <strong>dietlabels:</strong> {data.dietlabels.toString()}
          </li>
        )}
        {data.cautions.length > 0 && (
          <li
            className="list-group-item"
            style={{ backgroundColor: "#FFFACD" }}
          >
            <strong>cautions:</strong> {data.cautions.toString()}
          </li>
        )}
      </ul>
    </div>
  );
};

export default NutritionShowData;
