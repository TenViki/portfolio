from json import loads

jsonData = """
{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et "},{"type":"text","marks":[{"type":"bold"}],"text":"dolore "},{"type":"text","text":"magna aliqua. "},{"type":"text","marks":[{"type":"italic"}],"text":"Tellus "},{"type":"text","text":"integer feugiat "},{"type":"text","marks":[{"type":"underline"}],"text":"scelerisque "},{"type":"text","text":"varius morbi enim "},{"type":"text","marks":[{"type":"strike"}],"text":"nunc "},{"type":"text","marks":[{"type":"highlight"}],"text":"faucibus"},{"type":"text","text":" a. Vitae "},{"type":"text","marks":[{"type":"code"}],"text":"purus "},{"type":"text","text":"faucibus ornare suspendisse sed nisi lacus sed viverra. Mattis molestie a iaculis at. Nulla aliquet enim tortor at auctor urna nunc. Sit amet est placerat in egestas erat imperdiet. Sed felis eget velit aliquet sagittis id. Ac felis donec et odio. Eget nunc scelerisque viverra mauris. Duis convallis convallis tellus id interdum. Lectus urna duis convallis convallis tellus id. Urna et pharetra pharetra massa massa ultricies mi quis hendrerit. Non tellus orci ac auctor augue mauris augue. Donec et odio pellentesque diam volutpat commodo sed. Non consectetur a erat nam at lectus."}]},{"type":"heading","attrs":{"textAlign":"left","level":1},"content":[{"type":"text","text":"asdf"}]},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Quis commodo odio aenean sed adipiscing diam donec. Interdum varius sit amet mattis vulputate enim. At quis risus sed vulputate odio ut enim. Pellentesque sit amet porttitor eget dolor morbi non arcu. Porttitor eget dolor morbi non arcu risus quis. Vitae tempus quam pellentesque nec nam aliquam sem. Nam at lectus urna duis convallis convallis tellus id interdum. Massa ultricies mi quis hendrerit dolor magna. Velit scelerisque in dictum non consectetur. Ut porttitor leo a diam."}]},{"type":"heading","attrs":{"textAlign":"left","level":2},"content":[{"type":"text","text":"Podnadpis"}]},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Ipsum a arcu cursus vitae congue mauris rhoncus. Vivamus arcu felis bibendum ut tristique et egestas. Sit amet venenatis urna cursus eget. Volutpat ac tincidunt vitae semper quis lectus nulla. Leo a diam sollicitudin tempor id eu nisl. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Sed faucibus turpis in eu mi bibendum neque egestas. Blandit massa enim nec dui nunc mattis enim ut. Cursus metus aliquam eleifend mi in nulla. Porttitor massa id neque aliquam vestibulum. Ac ut consequat semper viverra nam libero justo. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Egestas congue quisque egestas diam in arcu cursus euismod quis."}]},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Vel turpis nunc eget lorem dolor sed viverra ipsum. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Nunc mi ipsum faucibus vitae. Aliquam id diam maecenas ultricies mi eget mauris. Tincidunt dui ut ornare lectus sit amet est placerat in. Tellus molestie nunc non blandit. Dignissim suspendisse in est ante in nibh mauris cursus mattis. Adipiscing enim eu turpis egestas. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Vestibulum lectus mauris ultrices eros in cursus. Sed augue lacus viverra vitae congue eu consequat ac."}]},{"type":"heading","attrs":{"textAlign":"left","level":3},"content":[{"type":"text","text":"Heading 3"}]},{"type":"heading","attrs":{"textAlign":"left","level":4},"content":[{"type":"text","text":"Heading 4"}]},{"type":"blockquote","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Block quote"}]},{"type":"horizontalRule"},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"sdfsdf"}]}]},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"sdfsdf"}]},{"type":"orderedList","attrs":{"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Numbered list"}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"asdasd"}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"as"}]}]}]},{"type":"paragraph","attrs":{"textAlign":"justify"},"content":[{"type":"text","text":"Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Nisl nunc mi ipsum faucibus vitae aliquet. Viverra accumsan in nisl nisi. Viverra tellus in hac habitasse platea dictumst vestibulum. Quis viverra nibh "},{"type":"text","marks":[{"type":"subscript"}],"text":"sdf "},{"type":"text","text":"cras pulvinar "},{"type":"text","marks":[{"type":"superscript"}],"text":"mattis "},{"type":"text","text":"nunc sed. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Arcu risus quis varius quam quisque id. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Proin libero nunc consequat interdum varius sit. Placerat orci nulla pellentesque dignissim enim sit amet. Amet commodo nulla facilisi nullam vehicula ipsum a. Blandit massa enim nec dui nunc. Nibh ipsum consequat nisl vel "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://google.com/","target":null,"class":null}}],"text":"pretium"},{"type":"text","text":"."}]},{"type":"paragraph","attrs":{"textAlign":"center"},"content":[{"type":"text","text":"sadfsadfasdfsdafsdafasdf"}]},{"type":"paragraph","attrs":{"textAlign":"right"},"content":[{"type":"text","text":"asdfasdfasdfasdfasdfasdf"}]},{"type":"paragraph","attrs":{"textAlign":"left"}},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"sdfdsf"}]},{"type":"image","attrs":{"src":"http://10.0.0.100:5173/files/39e7d01b-a7d7-4e4d-8729-1aded4abf2ea/data","alt":null,"title":null}},{"type":"image","attrs":{"src":"http://10.0.0.100:5173/files/a1beeba0-a207-4ef6-859b-d52deb694ac4/data","alt":null,"title":null}},{"type":"image","attrs":{"src":"http://10.0.0.100:5173/files/25510b2c-1530-4db1-8a52-b5afd7e9a263/data","alt":null,"title":null}},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"And another one"}]},{"type":"image","attrs":{"src":"http://10.0.0.100:5173/files/3ef18e50-4273-445c-ad14-784bff132a6a/data","alt":null,"title":null}}]}"""

docTypes = {}
parsedData = loads(jsonData)

def getTypes(data): 
    docTypes[data["type"]] = {}

    if "attrs" in data:
        for key, value in data["attrs"].items():
            # check if key is already in dict
            if key in docTypes[data["type"]]:
                # push value to list
                docTypes[data["type"]][key].append(value)
            else:
                # create list with value
                docTypes[data["type"]][key] = [value]

    if "content" in data:
        for item in data["content"]:
            getTypes(item)

getTypes(parsedData)

print(docTypes)


# Iteratively go through parsed data and add to list all types