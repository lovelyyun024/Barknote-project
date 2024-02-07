from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import ImageForm
from ..aws import (upload_file_to_s3, get_unique_filename, remove_file_from_s3)

image_routes = Blueprint('images', __name__)

@image_routes.route("", methods=['POST'])
def upload_image():
        form = ImageForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():

            image = form.data['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                # if the dictionary doesn't have  url key
                # it means that there was an error when we tried to upload
                # so we send back that error message (and we printed it above)
                return {"errors": [upload]}

            url = upload['url']
            return {"url": url}

        else:
            return form.errors, 400

@image_routes.route("/<img>", methods=['DELETE'])
@login_required
def delete_image(img):
    removed = remove_file_from_s3(img)
    return {"removed": removed}
