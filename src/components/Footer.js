
const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center h-[10vh] bg-slate-200 shadow-lg font-bold tracking-wide mt-6">
        <p className="text-center mx-2">
          &copy; 2024 <span className="text-orange-500">FoodCart</span> || Developed by &nbsp; 
          <span className="text-orange-500 cursor-pointer hover:text-orange-600">
            <a href="https://github.com/codeAlok" target="_blank">Alok kumar</a>
          </span>
        </p>
    </div>
  )
}

export default Footer;