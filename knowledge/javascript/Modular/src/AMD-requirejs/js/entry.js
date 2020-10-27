//其他配置

require(["./module_3"],
    function (data) {
        var p = document.getElementsByTagName('p')[0];
		p.innerHTML = data.config;
    }
)