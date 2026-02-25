interface RiskGaugeProps {
  value: number;
  size?: number;
  label?: string;
}

const RiskGauge = ({ value, size = 180, label = "Risk Score" }: RiskGaugeProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const angle = -90 + (clampedValue / 100) * 180;
  const radius = size / 2 - 20;
  const cx = size / 2;
  const cy = size / 2 + 10;

  const getColor = (v: number) => {
    if (v <= 33) return "hsl(152, 55%, 42%)";
    if (v <= 66) return "hsl(38, 92%, 50%)";
    return "hsl(0, 72%, 50%)";
  };

  const getRiskLabel = (v: number) => {
    if (v <= 33) return "Low Risk";
    if (v <= 66) return "Medium Risk";
    return "High Risk";
  };

  const needleX = cx + radius * 0.75 * Math.cos((angle * Math.PI) / 180);
  const needleY = cy + radius * 0.75 * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        {/* Background arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="hsl(220, 15%, 92%)"
          strokeWidth={12}
          strokeLinecap="round"
        />
        {/* Green segment */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx - radius * Math.cos(Math.PI / 3)} ${cy - radius * Math.sin(Math.PI / 3)}`}
          fill="none"
          stroke="hsl(152, 55%, 42%)"
          strokeWidth={12}
          strokeLinecap="round"
          opacity={0.8}
        />
        {/* Yellow segment */}
        <path
          d={`M ${cx - radius * Math.cos(Math.PI / 3)} ${cy - radius * Math.sin(Math.PI / 3)} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(Math.PI / 3)} ${cy - radius * Math.sin(Math.PI / 3)}`}
          fill="none"
          stroke="hsl(38, 92%, 50%)"
          strokeWidth={12}
          opacity={0.8}
        />
        {/* Red segment */}
        <path
          d={`M ${cx + radius * Math.cos(Math.PI / 3)} ${cy - radius * Math.sin(Math.PI / 3)} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="hsl(0, 72%, 50%)"
          strokeWidth={12}
          strokeLinecap="round"
          opacity={0.8}
        />
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke={getColor(clampedValue)}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={6} fill={getColor(clampedValue)} />
        <circle cx={cx} cy={cy} r={3} fill="white" />
        {/* Value */}
        <text x={cx} y={cy - 20} textAnchor="middle" className="text-2xl font-bold" fill={getColor(clampedValue)}>
          {clampedValue}
        </text>
      </svg>
      <p className="text-sm font-medium text-muted-foreground mt-1">{label}</p>
      <p className="text-xs font-semibold" style={{ color: getColor(clampedValue) }}>{getRiskLabel(clampedValue)}</p>
    </div>
  );
};

export default RiskGauge;
