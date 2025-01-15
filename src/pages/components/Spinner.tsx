
interface Props {
    size?: number;
    color?: string;
    className?: string;
}

const Spinner = ({size, color, className}: Props) => {

  return (
    <div style={{
          width: size ? size + "px" : "30px",
          height: size ? size + "px" : "30px",
          borderColor: color ?? "white",
          borderBottomColor: "transparent"
        }} className={`inline-block rounded-full border-2 animate-spin ${className ?? ""}`}>
    </div>
  )
}

export default Spinner;